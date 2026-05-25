interface MergePendingCollapsedIdsParams {
  collapsedIds: Set<string>
  pendingCollapsedIds: Map<string, boolean>
}

export const mergePendingCollapsedIds = ({
  collapsedIds,
  pendingCollapsedIds
}: MergePendingCollapsedIdsParams): Set<string> => {
  const mergedCollapsedIds: Set<string> = new Set(collapsedIds)

  pendingCollapsedIds.forEach((desiredCollapsed: boolean, id: string): void => {
    if (desiredCollapsed) mergedCollapsedIds.add(id)
    else mergedCollapsedIds.delete(id)
  })

  return mergedCollapsedIds
}
