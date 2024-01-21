import SideButtonWrapper from '../components/SideButtonWrapper'
import DocsTable from '../components/Docs/DocsTable'
import { useDocsContextValue } from '../hooks/pages/docs'
import { docsContext } from '../context'
import React from 'react'

export default function Docs() {
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
                <div style={{ maxWidth: '80vw', marginTop: 50 }}>
                    <div style={{ fontSize: 50, marginBottom: 15 }}>Docs</div>
                    <DocsTable />
                </div>
            </div>
            <SideButtonWrapper />
        </docsContext.Provider>
    )
}
