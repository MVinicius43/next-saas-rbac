import { FormEvent, useState, useTransition } from 'react'

type FormState =
  | {
      success: boolean
      message: null
      errors: {
        errors: string[]
        properties?:
          | {
              email?:
                | {
                    errors: string[]
                  }
                | undefined
              password?:
                | {
                    errors: string[]
                  }
                | undefined
              password_confirmation?:
                | {
                    errors: string[]
                  }
                | undefined
              name?:
                | {
                    errors: string[]
                  }
                | undefined
              domain?:
                | {
                    errors: string[]
                  }
                | undefined
              shouldAttachUsersByDomain?:
                | {
                    errors: string[]
                  }
                | undefined
              description?:
                | {
                    errors: string[]
                  }
                | undefined
            }
          | undefined
      }
    }
  | {
      success: boolean
      message: string | null
      errors: null
    }

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
