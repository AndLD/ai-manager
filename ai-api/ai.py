import time
import os

from utils import folder_size, load_env_key, ensure_folder_exists, get_subfolder_names, delete_contents, extract_google_id

os.environ['OPENAI_API_KEY'] = load_env_key('OPENAI_API_KEY')

from llama_index import download_loader, SimpleDirectoryReader, StorageContext, GPTVectorStoreIndex, download_loader, load_index_from_storage, load_indices_from_storage, readers, LLMPredictor, ServiceContext
from llama_index.tools import QueryEngineTool, ToolMetadata
from llama_index.query_engine import SubQuestionQueryEngine
from llama_index.readers import SimpleWebPageReader, GoogleDocsReader

from llama_index.llms import OpenAI

from google_sheets_reader import GoogleSheetsReader
# GoogleDocsReader = download_loader('GoogleDocsReader')

DATA_SOURCE_TYPES = ['google-sheets']
DATA_SOURCE_READERS = {
    'google-sheets': {
        'reader': GoogleSheetsReader,
        'arguments': {},
        'reference-sanitizer': extract_google_id
    },
    'google-docs': {
        'reader': GoogleDocsReader,
        'arguments': {},
        'reference-sanitizer': extract_google_id
    },
    'web-page': {
        'reader': SimpleWebPageReader,
        'arguments': {}
    }
}

def docs_to_indexes(userId, docs, forceRebuild=False):
    indexes = []

    userStoreFolder = f"../store/{userId}"
    ensure_folder_exists(userStoreFolder)
    print('Storage directory size: ', folder_size(userStoreFolder))

    shouldRebuildDocs = False

    for doc in docs:
        if not os.path.exists(f"{userStoreFolder}/{str(doc['_id'])}"):
            shouldRebuildDocs = True
            break

    start_time = time.time()

    if (forceRebuild or shouldRebuildDocs):
        delete_contents(userStoreFolder)
        llm = OpenAI(temperature=0.1, model="gpt-4")
#         llm = OpenAI(temperature=0, model="text-davinci-003")
        service_context = ServiceContext.from_defaults(llm=llm)

        for doc in docs:
            index = None

            Reader = DATA_SOURCE_READERS[doc['type']]['reader']
            loader = Reader(**DATA_SOURCE_READERS[doc['type']]['arguments'])

            sanitizer = DATA_SOURCE_READERS[doc['type']]['reference-sanitizer']

            print(sanitizer(doc['reference']))

            documents = loader.load_data( [ sanitizer(doc['reference']) if sanitizer is not None else doc['reference'] ] )

            index = GPTVectorStoreIndex.from_documents(documents, service_context=service_context)

            index_store_path = f"{userStoreFolder}/{str(doc['_id'])}"

            ensure_folder_exists(index_store_path)
            index.storage_context.persist(persist_dir=index_store_path)

            indexes.append(index)

        print('\nStorage directory size: ', folder_size(userStoreFolder), '\n')
    elif (os.path.exists(userStoreFolder)):
        subfolder_names = get_subfolder_names(userStoreFolder)

        for docId in subfolder_names:
            index_dir = f"{userStoreFolder}/{docId}"

            storage_context = StorageContext.from_defaults(persist_dir=index_dir)
            index = load_index_from_storage(storage_context)

            indexes.append(index)

    end_time = time.time()
    execution_time = end_time - start_time
    print("Execution time:", execution_time, "seconds")

    return indexes

def build_query_engines(docs, indexes):
    query_engine_tools = []

    for i, index in enumerate(indexes):
        query_engine = index.as_query_engine(similarity_top_k=3)

        query_engine_tool = QueryEngineTool(
            query_engine=query_engine,
            metadata=ToolMetadata(
                name=str(docs[i]['_id']),
                description=docs[i]['title']
            )
        )

        query_engine_tools.append(query_engine_tool)

    s_engine = SubQuestionQueryEngine.from_defaults(query_engine_tools=query_engine_tools)

    return s_engine

# def get_answer(indexes, chat_engine, question):
#     if (index):
#         if chat_engine is None:
#             chat_engine = index.as_chat_engine(chat_mode='react')
#
#         response = chat_engine.chat(prompt)
#         return response
#     else:
#         print('No index')

def test():
    EXAMPLE_DOCS = [
        {
            '_id': '1',
            'title': 'Provides information about products and clients',
            'type': 'google-sheets',
            'reference': '1hVk8Se0ZyScvkbc-NEhg4ISyBulxyuZ-ATT2Hbx_uy8'
        }
    ]

    indexes = docs_to_indexes('iam456', EXAMPLE_DOCS, False)

    engine = build_query_engines(EXAMPLE_DOCS, indexes)

    response = engine.query('What products do we have?')

    print(response)

def query(message, userId, docs):
    indexes = docs_to_indexes(userId, docs)

    engine = build_query_engines(docs, indexes)

    response = engine.query(message)

    return response