
export type key<T = never> = 'type' | 'data' | 'title' | T 

export type params = Record<key,any>

export type send = (params:params) => void