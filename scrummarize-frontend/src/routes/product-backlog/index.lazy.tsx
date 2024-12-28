import { createLazyFileRoute } from '@tanstack/react-router'
import ProductBacklog from '../../ProductBacklog'

export const Route = createLazyFileRoute('/product-backlog/')({
  component: ProductBacklog,
})
