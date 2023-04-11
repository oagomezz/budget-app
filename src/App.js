import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import AddBudgetModal from "./components/AddBudgetModal"
import ViewExpensesModal from "./components/ViewExpensesModal"
import BudgetCard from "./components/BudgetCard"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContexts"
import AddExpenseModal from "./components/AddExpenseModal"
import TotalBudgetCard from "./components/TotalBudgetCard"
import "./App.css"


function App() {
  const[showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const[showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const[ViewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const[AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

function openAddExpenseModal(budgetId) {
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
}

  return( 
  <>
  <div className="background">
  <Container className="my-4">
    <Stack 
    direction='horizontal' 
    gap='2' 
    className="mb-4">
      <h1 className='me-auto'>
        Oscar's Budget App
      </h1>
      <Button 
      variant="primary" 
      onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={openAddExpenseModal}> Add Expenses </Button>
      </Stack>
      <div style={{ display:'grid', gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))", gap: "1rem", alignItems:"Flex-start" }} >
        {budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
         return (
         <BudgetCard 
          key={budget.id}
          name={budget.name} 
          amount={amount} 
          max={budget.max} 
          onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          onViewExpenseClick={() => setViewExpenseModalBudgetId(budget.id)}/>
         )
       })}
       <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
       onViewExpenseClick={() => setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
       <TotalBudgetCard />
      </div>
  </Container>
  <AddBudgetModal 
  show={showAddBudgetModal} 
  handleClose={() => setShowAddBudgetModal(false)}
  />
  <AddExpenseModal show={showAddExpenseModal} 
  defaultBudgetId={AddExpenseModalBudgetId}
  handleClose={() => setShowAddExpenseModal(false)}
  />
  <ViewExpensesModal budgetId={ViewExpenseModalBudgetId} 
  handleClose={() => setViewExpenseModalBudgetId()}/>
  </div>
  </>
)}

export default App
