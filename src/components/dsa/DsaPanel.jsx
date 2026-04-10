import { useState } from 'react'
import Stack from './Stack'
import Queue from './Queue'
import LinkedList from './LinkedList'
import BinaryTree from './BinaryTree'
import Sorting from './Sorting'
import TracePanel from '../shared/TracePanel'
import './DsaPanel.css'

const DS_TABS = [
  { id: 'stack', label: 'Stack' },
  { id: 'queue', label: 'Queue' },
  { id: 'linkedlist', label: 'Linked List' },
  { id: 'binarytree', label: 'Binary Tree' },
  { id: 'sorting', label: 'Sorting' },
]

const DS_COMPONENTS = {
  stack: Stack,
  queue: Queue,
  linkedlist: LinkedList,
  binarytree: BinaryTree,
  sorting: Sorting,
}

export default function DsaPanel() {
  const [activeDs, setActiveDs] = useState('stack')
  const [activeView, setActiveView] = useState('simulate')
  const [trace, setTrace] = useState({ jsCode: '', pyCode: '', activeLine: null, variables: {} })

  const ActiveComponent = DS_COMPONENTS[activeDs]

  const handleDsChange = (id) => {
    setActiveDs(id)
    setActiveView('simulate')
    setTrace({ jsCode: '', pyCode: '', activeLine: null, variables: {} })
  }

  return (
    <div className="dsa-panel">
      <div className="dsa-ds-tabs">
        {DS_TABS.map(tab => (
          <button type="button" key={tab.id}
            className={`dsa-ds-tab${activeDs === tab.id ? ' active' : ''}`}
            onClick={() => handleDsChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dsa-view-tabs">
        <button type="button"
          className={`dsa-view-tab${activeView === 'simulate' ? ' active' : ''}`}
          onClick={() => setActiveView('simulate')}
        >Simulate</button>
        <button type="button"
          className={`dsa-view-tab${activeView === 'code' ? ' active' : ''}`}
          onClick={() => setActiveView('code')}
        >Code</button>
      </div>

      <div className="dsa-content" style={activeView === 'simulate' ? { display: 'flex', flexDirection: 'row', gap: 24, padding: 24 } : {}}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ActiveComponent view={activeView} setTrace={activeView === 'simulate' ? setTrace : undefined} />
        </div>
        {activeView === 'simulate' && trace.jsCode && (
          <div style={{ width: 400, flexShrink: 0 }}>
            <TracePanel
              jsCode={trace.jsCode}
              pyCode={trace.pyCode}
              currentLine={trace.activeLine}
              variables={trace.variables}
            />
          </div>
        )}
      </div>
    </div>
  )
}
