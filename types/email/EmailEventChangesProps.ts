type ChangeHistory = {
  new: string
  old: string
}

type EmailEventChangesProps = {
  title: string
  titleChange?: ChangeHistory
  descriptionChange?: ChangeHistory
  locationChange?: ChangeHistory
  accessDateChange?: ChangeHistory
  accessStartChange?: ChangeHistory
  accessEndChange?: ChangeHistory
}

export default EmailEventChangesProps
