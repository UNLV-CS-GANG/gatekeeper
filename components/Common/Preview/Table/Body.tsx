import RowLoading from './RowLoading'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Body({
  itemsLength,
  isLoadingItems,
  displayCount,
  children,
}: {
  itemsLength: number
  isLoadingItems: boolean
  displayCount: number
  children: React.ReactNode
}) {
  return (
    <>
      <tbody>
        {isLoadingItems && new Array(displayCount).fill(0).map((_: number, i: number) => <RowLoading key={i} />)}
        {!isLoadingItems && itemsLength > 0 && children}
      </tbody>
    </>
  )
}
