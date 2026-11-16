export function singleResponse<T>(data: T) {
  return { success: true, data };
}

export function listResponse<T>(data: T[], total = data.length) {
  return { success: true, data, meta: { total } };
}
