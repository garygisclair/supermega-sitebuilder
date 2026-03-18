import React from 'react'
import './SidebarMenuItem.css'
import { Icon } from '../Icon/Icon'

export type SidebarMenuItemLayout = 'collapsed' | 'expanded' | 'mobile'
export type SidebarMenuItemType = 'site' | 'tool'

export type SidebarMenuItemProps = {
  /** collapsed = icon-only pill; expanded = full row; mobile = full row, larger text */
  layout?: SidebarMenuItemLayout
  /** site = arrow-right default; tool = hub-org-sites default. Overridden by icon prop. */
  type?: SidebarMenuItemType
  name?: string
  /** Explicit icon — overrides the type default */
  icon?: React.ReactNode
  showChevron?: boolean
  /** Replaces the chevron with a custom trailing icon (e.g. external-link) */
  trailingIcon?: React.ReactNode
  /** @deprecated use icon instead */
  toolIcon?: React.ReactNode
  /** Force hover appearance — for preview/testing only */
  forceHover?: boolean
}

export function SidebarMenuItem({
  layout = 'expanded',
  type = 'site',
  name = 'Name',
  icon,
  showChevron = false,
  trailingIcon,
  toolIcon,
  forceHover = false,
}: SidebarMenuItemProps) {
  const resolvedIcon = icon ?? toolIcon ?? (
    type === 'site'
      ? <Icon name="arrow-right" size={20} />
      : <Icon name="hub-org-sites" size={20} />
  )
  const classes = [
    'sm-sidebar-menu-item',
    `sm-sidebar-menu-item--${layout}`,
    `sm-sidebar-menu-item--${type}`,
    forceHover ? 'sm-sidebar-menu-item--hover' : '',
  ].filter(Boolean).join(' ')

  if (layout === 'collapsed') {
    return (
      <div className={classes}>
        <div className="sm-sidebar-menu-item__icon-wrap">
          {resolvedIcon}
        </div>
      </div>
    )
  }

  const trailing = trailingIcon ?? (showChevron
    ? <Icon name="chevron-right" size={16} className="sm-sidebar-menu-item__chevron" />
    : null)

  return (
    <div className={classes}>
      <div className="sm-sidebar-menu-item__inner">
        <div className="sm-sidebar-menu-item__icon-wrap">
          {resolvedIcon}
        </div>
        <span className="sm-sidebar-menu-item__name">{name}</span>
      </div>
      {trailing && (
        <span className="sm-sidebar-menu-item__trailing">{trailing}</span>
      )}
    </div>
  )
}
