'use server'

import { createMapApiProvider } from '@/lib/providers/map/api'

// Server actions for sensor nodes data
export async function fetchSensorNodesAction(authToken: string | null = null) {
  const provider = createMapApiProvider(authToken)
  return await provider.getSensorNodes()
}