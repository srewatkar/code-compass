import { useState } from 'react'
import Stack from './Stack'
import Queue from './Queue'
import LinkedList from './LinkedList'
import BinaryTree from './BinaryTree'
import Sorting from './Sorting'
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

  const ActiveComponent = DS_COMPONENTS[activeDs]

  return (
    <div className="dsa-panel">
      <div className="dsa-ds-tabs">
        {DS_TABS.map(tab => (
          <button
            type="button"
            key={tab.id}
            className={`dsa-ds-tab${activeDs === tab.id ? ' active' : ''}`}
            onClick={() => { setActiveDs(tab.id); setActiveView('simulate') }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dsa-view-tabs">
        <button
          type="button"
          className={`dsa-view-tab${activeView === 'simulate' ? ' active' : ''}`}
          onClick={() => setActiveView('simulate')}
        >
          Simulate
        </button>
        <button
          type="button"
          className={`dsa-view-tab${activeView === 'code' ? ' active' : ''}`}
          onClick={() => setActiveView('code')}
        >
          Code
        </button>
      </div>

      <div className="dsa-content">
        <ActiveComponent view={activeView} />
      </div>
    </div>
  )
}
