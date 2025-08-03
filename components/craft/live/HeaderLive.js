import {Fragment} from 'react'
import Container from '../nodes/global/live/Container'
import RootContainer from '../nodes/global/live/RootContainer'

const components = {
  RootContainer,
  Container,
}

export default function HeaderLive(templateTree, nodeId = 'ROOT') {
  const node = templateTree[nodeId]
  if (!node) return null

  let Component = components[node.type.resolvedName]

  if (!Component) return null

  const componentProps = Component?.props || {}
  const mergedProps = {
    ...node.props,
    ...componentProps,
  }

  return (
    <>
      <Component
        key={'header_' + nodeId}
        {...mergedProps}
      >
        {(node.nodes || []).map((childId) => (
          <Fragment key={'header_' + childId}>
            {HeaderLive(templateTree, childId)}
          </Fragment>
        ))}
      </Component>
    </>
  )
}
