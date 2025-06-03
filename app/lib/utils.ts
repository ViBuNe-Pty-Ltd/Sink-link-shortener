// Stub file to satisfy imports

export function noop() {

}

// Fake cn() for class name merging
export function cn(...args: any[]) {
  return args.filter(Boolean).join(' ')
}
