import SideButtonWrapper from '../components/SideButtonWrapper'
import DocsTable from '../components/Docs/DocsTable'
import { useDocsContextValue } from '../hooks/pages/docs'
import { docsContext } from '../context'
import React, { useState } from 'react'
import AddDocModal from '../components/Docs/AddDocModal'
import DocsControls from '../components/Docs/DocsControls'

export default function Docs() {
    const isOpenModalState = useState(false)

    return (
        <docsContext.Provider value={useDocsContextValue()}>
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    width: '100vw',
                    justifyContent: 'center',
                }}
            >
                <div style={{ marginTop: 50 }}>
                    <div style={{ fontSize: 50, marginBottom: 10 }}>Docs</div>
                    <DocsControls isOpenModalState={isOpenModalState} />
                    <DocsTable />
                    <AddDocModal isModalOpenState={isOpenModalState} />
                </div>
            </div>
            <SideButtonWrapper />
        </docsContext.Provider>
    )
}
