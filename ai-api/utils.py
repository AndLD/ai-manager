import os
from hurry.filesize import size
import json
import shutil
import re

def _folder_size(path='.'):
    total = 0
    for entry in os.scandir(path):
        if entry.is_file():
            total += entry.stat().st_size
        elif entry.is_dir():
            total += _folder_size(entry.path)
    return total

def folder_size(path='.'):
    total = _folder_size(path)
    return size(total)

def load_key_from_json(file_path, target_key):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data.get(target_key)
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Unable to decode JSON in file - {file_path}")
        return None

def load_env_key(target_key):
    return load_key_from_json('env.json', target_key)

def ensure_folder_exists(folder_path):
    try:
        # Check if the folder exists
        if not os.path.exists(folder_path):
            # If not, create the folder
            os.makedirs(folder_path)
            print(f"Folder created: {folder_path}")
        else:
            print(f"Folder already exists: {folder_path}")

        return True
    except Exception as e:
        print(f"Error: Unable to create folder - {folder_path}\nError details: {e}")
        return False

def get_subfolder_names(parent_folder):
    try:
        # Use os.listdir to get a list of all files and folders in the parent folder
        all_contents = os.listdir(parent_folder)

        # Use a list comprehension to filter out only the subfolders
        subfolders = [item for item in all_contents if os.path.isdir(os.path.join(parent_folder, item))]

        return subfolders
    except FileNotFoundError:
        print(f"Error: Folder not found - {parent_folder}")
        return []
    except Exception as e:
        print(f"Error: Unable to get subfolders in folder - {parent_folder}\nError details: {e}")
        return []

def delete_contents(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            os.remove(file_path)

        for dir in dirs:
            dir_path = os.path.join(root, dir)
            shutil.rmtree(dir_path)

def extract_google_id(input_str):
    """
    Extracts the Google Sheets or Google Docs ID from a given URL or pure ID.

    Args:
    - input_str (str): The Google Sheets or Google Docs URL or pure ID.

    Returns:
    - str: The extracted ID.
    """
    # Define a regular expression pattern to match the Google Sheets or Docs ID
    pattern_sheets = r'/spreadsheets/d/([a-zA-Z0-9-_]+)'
    pattern_docs = r'/document/d/([a-zA-Z0-9-_]+)'

    # Use re.search to find the match in the input for Sheets
    match_sheets = re.search(pattern_sheets, input_str)

    # Use re.search to find the match in the input for Docs if Sheets match is not found
    if not match_sheets:
        match_docs = re.search(pattern_docs, input_str)
        if match_docs:
            return match_docs.group(1)

    # Check if a match is found for Sheets
    elif match_sheets:
        # Extract the ID from the match object for Sheets
        return match_sheets.group(1)

    # If no match is found, assume the input_str is a pure ID and return it
    return input_str