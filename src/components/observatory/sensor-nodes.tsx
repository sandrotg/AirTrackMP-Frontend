"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, XCircle, Cpu, Signal, Battery, RefreshCw, Edit, MapPin, Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useSensorNodes } from "@/hooks/useSensorNodes"
import { createNode, updateNode } from "@/lib/nodes-api"
import { showSuccess, showInfo, showErrorToast } from "@/lib/error-handler"

const statusConfig = {
  online: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/20",
    label: "ONLINE",
  },
  offline: {
    icon: XCircle,
    color: "text-muted-foreground",
    bg: "bg-muted",
    label: "OFFLINE",
  },
  error: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/20",
    label: "ERROR",
  },
}

export function SensorNodeManagement() {
  const { sensorNodes, loading } = useSensorNodes()

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="text-right space-y-1.5">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-xs font-bold text-foreground tracking-wide">
            SENSOR NODE MANAGEMENT
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">NODES ACTIVE:</span>
          <span className="text-xs font-bold text-success">{sensorNodes.filter(n => n.status === "ACTIVE").length}/{sensorNodes.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {sensorNodes.map((node) => {
          // Map API status to UI status for display
          const statusMap: Record<string, keyof typeof statusConfig> = {
            "ACTIVE": "online",
            "INACTIVE": "offline",
            "MAINTENANCE": "error",
            "OFFLINE": "offline",
            "CALIBRATION": "error"
          }
          const uiStatus = statusMap[node.status] || "online"
          const config = statusConfig[uiStatus]
          const Icon = config.icon
          return (
            <div
              key={node.id}
              className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3"
            >
              <div className={cn("p-2 rounded-full", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{node.name}</p>
                <p className="text-[10px] text-muted-foreground">{node.model}</p>
              </div>
              <div className="text-right">
                <span className={cn("text-xs font-bold", config.color)}>{config.label}</span>
                <div className="flex items-center gap-1 mt-1">
                  <Battery className="h-3 w-3 text-muted-foreground" />
                  <span className={cn(
                    "text-[10px]",
                    (node.battery || 0) < 20 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {(node.battery || 0)}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function FleetManager() {
  const { sensorNodes: fleetNodes, loading, refresh } = useSensorNodes()
  const [filter, setFilter] = useState<'all' | 'errors'>('all')
  const [scanning, setScanning] = useState(false)
  const [provisionOpen, setProvisionOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editingNode, setEditingNode] = useState<typeof fleetNodes[0] | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [formName, setFormName] = useState('')
  const [formLocation, setFormLocation] = useState('')
  const [formLat, setFormLat] = useState('')
  const [formLng, setFormLng] = useState('')

  const errorNodesCount = fleetNodes.filter(
    (n) => n.status === 'MAINTENANCE' || n.status === 'CALIBRATION'
  ).length

  const filteredNodes =
    filter === 'errors'
      ? fleetNodes.filter(
          (n) => n.status === 'MAINTENANCE' || n.status === 'CALIBRATION'
        )
      : fleetNodes

  function resetForm() {
    setFormName('')
    setFormLocation('')
    setFormLat('')
    setFormLng('')
  }

  function openEditDialog(node: typeof fleetNodes[0]) {
    setEditingNode(node)
    setFormName(node.name)
    setFormLocation(node.location || '')
    setFormLat(String(node.latitude || ''))
    setFormLng(String(node.longitude || ''))
    setEditOpen(true)
  }

  async function handleScanNetwork() {
    setScanning(true)
    try {
      refresh()
      await new Promise((r) => setTimeout(r, 800))
      showSuccess('Network scan complete')
    } catch {
      showErrorToast('Scan failed')
    } finally {
      setScanning(false)
    }
  }

  async function handleProvisionNode() {
    if (!formName || !formLocation || !formLat || !formLng) {
      showInfo('Please fill in all fields')
      return
    }
    setSubmitting(true)
    try {
      await createNode({
        name: formName,
        location: formLocation,
        latitude: parseFloat(formLat),
        longitude: parseFloat(formLng),
      })
      showSuccess(`Node "${formName}" provisioned`)
      setProvisionOpen(false)
      resetForm()
      refresh()
    } catch (err) {
      showErrorToast(err, 'Failed to provision node')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdateNode() {
    if (!editingNode) return
    if (!formName || !formLocation || !formLat || !formLng) {
      showInfo('Please fill in all fields')
      return
    }
    setSubmitting(true)
    try {
      await updateNode(Number(editingNode.id), {
        name: formName,
        location: formLocation,
        latitude: parseFloat(formLat),
        longitude: parseFloat(formLng),
      })
      showSuccess(`Node "${formName}" updated`)
      setEditOpen(false)
      setEditingNode(null)
      resetForm()
      refresh()
    } catch (err) {
      showErrorToast(err, 'Failed to update node')
    } finally {
      setSubmitting(false)
    }
  }

  function handleRebootNode() {
    showInfo('Reboot command sent to node')
  }

  function handleUpdateFirmware() {
    showInfo('Firmware update queued for next maintenance window')
  }

  const statusMap: Record<string, keyof typeof statusConfig> = {
    ACTIVE: 'online',
    INACTIVE: 'offline',
    MAINTENANCE: 'error',
    OFFLINE: 'offline',
    CALIBRATION: 'error',
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-32 rounded-md" />
            <Skeleton className="h-9 w-36 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4">
              <Skeleton className="h-4 w-28 mb-2" />
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-10 rounded" />
              <Skeleton className="h-7 w-20 rounded" />
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="pb-3">
                    <Skeleton className="h-3 w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row} className="border-b border-border/50">
                  {[1, 2, 3, 4, 5, 6].map((col) => (
                    <td key={col} className="py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary font-medium tracking-wider">
              SYSTEM INFRASTRUCTURE
            </span>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
          <h1 className="text-3xl font-semibold text-foreground mt-1">
            ESP32 Fleet Manager
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time telemetry and lifecycle control for the global mesh sensor
            network.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="text-xs"
            onClick={handleScanNetwork}
            disabled={scanning}
          >
            <RefreshCw
              className={cn(
                'mr-2 h-4 w-4',
                scanning && 'animate-spin'
              )}
            />
            {scanning ? 'Scanning...' : 'Scan Network'}
          </Button>
          <Button
            className="text-xs"
            onClick={() => {
              resetForm()
              setProvisionOpen(true)
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            + Provision Node
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">
            TOTAL ACTIVE NODES
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-foreground">
              {fleetNodes.filter((n) => n.status === 'ACTIVE').length}
            </span>
            <span className="text-xs text-success">+12%</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">
            OPERATIONAL HEALTH
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-foreground">
              99.4%
            </span>
            <span className="text-xs text-primary">●</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 border-l-2 border-l-warning">
          <p className="text-xs text-warning mb-1">LOW BATTERY WARNINGS</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-foreground">
              {fleetNodes.filter((n) => (n.battery || 0) < 20).length}
            </span>
            <span className="text-xs text-muted-foreground">Nodes Affected</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 border-l-2 border-l-destructive">
          <p className="text-xs text-destructive mb-1">CRITICAL ERRORS</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-foreground">
              {errorNodesCount}
            </span>
            <span className="text-xs text-muted-foreground">Require Action</span>
          </div>
        </div>
      </div>

      {/* Main Node Detail */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Node Header */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    ESP32-CORE-GW-01
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    ID: 4F-92-BC-E1-0A-44
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-success font-bold">ONLINE</span>
                <p className="text-[10px] text-muted-foreground">
                  Uptime: 14d 06h 22m
                </p>
              </div>
            </div>
          </div>

          {/* Signal & Battery */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">
                SIGNAL STRENGTH (RSSI)
              </p>
              <div className="flex items-center gap-2">
                <Signal className="h-5 w-5 text-primary" />
                <span className="text-xl font-semibold text-primary">
                  -64 dBm
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                Status: Stable connection
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">
                BATTERY LIFECYCLE
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-semibold text-primary">84%</span>
                <span className="text-xs text-muted-foreground">LI-PO 3.7V</span>
              </div>
              <div className="w-full h-1 bg-secondary rounded-full mt-2">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: '84%' }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Est. replacement: Oct 24, 2024
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">
                SYSTEM CONTROLS
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleRebootNode}
                  className="flex items-center justify-between w-full text-xs text-foreground hover:text-primary transition-colors py-1"
                >
                  <span>Reboot Node</span>
                </button>
                <button
                  onClick={handleUpdateFirmware}
                  className="flex items-center justify-between w-full text-xs text-foreground hover:text-primary transition-colors py-1"
                >
                  <span>Update Firmware</span>
                </button>
                <button
                  onClick={() => openEditDialog(fleetNodes[0])}
                  className="flex items-center justify-between w-full text-xs text-foreground hover:text-primary transition-colors py-1"
                >
                  <span>Edit Location</span>
                  <MapPin className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Firmware */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-2">FIRMWARE</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono text-foreground">
                v2.4.1-stable
              </span>
              <span className="text-[10px] font-bold text-success bg-success/20 px-2 py-0.5 rounded">
                LATEST
              </span>
            </div>
          </div>
        </div>

        {/* Spatial Context */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Spatial Context
            </h3>
            <p className="text-[10px] text-muted-foreground">
              ZONE: NORTH RESEARCH WING
            </p>
          </div>
          <div className="relative h-64 bg-gradient-to-br from-[#0a1628] to-[#0d1f3c] rounded-lg overflow-hidden">
            <svg
              className="w-full h-full opacity-40"
              viewBox="0 0 400 200"
            >
              <path
                d="M 50 80 Q 100 60 150 80 T 250 70 T 350 80"
                stroke="#1e4a6f"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 30 120 Q 80 100 150 110 T 280 100 T 380 110"
                stroke="#1e4a6f"
                strokeWidth="1"
                fill="none"
              />
              <ellipse
                cx="200"
                cy="100"
                rx="150"
                ry="60"
                stroke="#1e4a6f"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-4 w-4 rounded-full bg-destructive animate-ping absolute" />
              <div className="h-4 w-4 rounded-full bg-destructive relative" />
            </div>
            <div className="absolute bottom-4 left-4 bg-secondary/90 backdrop-blur px-3 py-1.5 rounded text-xs text-foreground">
              SECTOR 7G - VENTILATION SHAFT
            </div>
          </div>
          <div className="bg-secondary/50 rounded p-3 mt-3 flex items-start gap-2">
            <span className="text-primary mt-0.5">ℹ</span>
            <p className="text-xs text-muted-foreground">
              Node is positioned 4.2m from nearest Gateway. Latency: 12ms.
            </p>
          </div>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            Subordinate Fleet Nodes
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'text-xs px-3 py-1 rounded transition-colors',
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter('errors')}
              className={cn(
                'text-xs px-3 py-1 rounded transition-colors',
                filter === 'errors'
                  ? 'bg-destructive text-destructive-foreground'
                  : 'text-destructive hover:bg-destructive/10'
              )}
            >
              ERRORS ({errorNodesCount})
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="pb-3 font-medium">NODE ID</th>
              <th className="pb-3 font-medium">STATUS</th>
              <th className="pb-3 font-medium">BATTERY</th>
              <th className="pb-3 font-medium">RSSI</th>
              <th className="pb-3 font-medium">FIRMWARE</th>
              <th className="pb-3 font-medium text-right">QUICK ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredNodes.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                  No {filter === 'errors' ? 'error' : ''} nodes found
                </td>
              </tr>
            ) : (
              filteredNodes.map((node) => {
                const uiStatus = statusMap[node.status] || 'online'

                return (
                  <tr
                    key={node.id}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-4">
                      <p className="text-sm font-medium text-foreground">
                        {node.id}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        MAC: {node.mac || 'N/A'}
                      </p>
                    </td>
                    <td className="py-4">
                      <span
                        className={cn(
                          'text-xs',
                          uiStatus === 'online' && 'text-foreground',
                          uiStatus === 'error' && 'text-destructive',
                          uiStatus === 'offline' && 'text-muted-foreground'
                        )}
                      >
                        {uiStatus === 'error' && '● '}
                        {uiStatus === 'offline' && '● '}
                        {node.status.charAt(0).toUpperCase() +
                          node.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4">
                      <p
                        className={cn(
                          'text-sm font-medium',
                          (node.battery || 0) < 20
                            ? 'text-destructive'
                            : 'text-foreground'
                        )}
                      >
                        {(node.battery || 0)}%
                      </p>
                      {(node.battery || 0) < 20 && (
                        <p className="text-[10px] text-destructive">
                          CRITICAL
                        </p>
                      )}
                      {node.batteryReplace && (node.battery || 0) >= 20 && (
                        <p className="text-[10px] text-muted-foreground">
                          Repl: {node.batteryReplace}
                        </p>
                      )}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {node.rssi || 'N/A'}
                    </td>
                    <td className="py-4 text-sm font-mono text-muted-foreground">
                      {node.firmware || 'N/A'}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {uiStatus === 'error' && (
                          <button
                            onClick={() => showInfo(`Node ${node.id}: ${node.status}`)}
                            className="text-warning hover:text-warning/80"
                            title="View error details"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => openEditDialog(node)}
                          className="text-muted-foreground hover:text-foreground"
                          title="Edit node"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Provision Dialog */}
      <Dialog open={provisionOpen} onOpenChange={setProvisionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Provision New Node</DialogTitle>
            <DialogDescription>
              Register a new sensor node in the network.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Node Name
              </label>
              <Input
                placeholder="e.g. Node-042"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Location
              </label>
              <Input
                placeholder="e.g. Zona Norte"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="19.4326"
                  value={formLat}
                  onChange={(e) => setFormLat(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="-99.1332"
                  value={formLng}
                  onChange={(e) => setFormLng(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleProvisionNode}
              disabled={submitting}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? 'Provisioning...' : 'Create Node'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Node</DialogTitle>
            <DialogDescription>
              Update the configuration for {editingNode?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Node Name
              </label>
              <Input
                placeholder="e.g. Node-042"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Location
              </label>
              <Input
                placeholder="e.g. Zona Norte"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="19.4326"
                  value={formLat}
                  onChange={(e) => setFormLat(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="-99.1332"
                  value={formLng}
                  onChange={(e) => setFormLng(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={submitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleUpdateNode}
              disabled={submitting}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
