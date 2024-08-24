import { toast } from 'react-toastify'

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  } catch (error) {
    console.error('Failed to copy to clipboard', error)
  }
}
