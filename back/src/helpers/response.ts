type RepsonseOk = {
  data: any
}

type ResponseKo = {
  err: {
    status: number
    code: string
    description: string
  }
}

export function success(resource: any): RepsonseOk {
return resource 
}

export function error({ status, code }: { status: number; code: string }, err: any): ResponseKo {
  const description = err.detail ? err.detail : err.message

  return {
    err: {
      status,
      code,
      description,
    },
  }
}