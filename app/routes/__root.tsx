import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../styles/layout.css'
import '../styles/fonts.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}
