import './Logo.css'

// ── Brand logos ──────────────────────────────────────────────
import SuperMegaLogoSvg      from '../../logos/supermega-logo.svg?react'
import SuperMegaMonoLogoSvg  from '../../logos/supermega-mono-logo.svg?react'
import PortalLogoSvg         from '../../logos/portal-logo.svg?react'
import PortalLogoDarkSvg     from '../../logos/portal-logo-dark.svg?react'
import PortalLogoStackedSvg  from '../../logos/portal-logo-stacked.svg?react'
import PortalFaviconSvg      from '../../logos/portal-favicon.svg?react'
import MegaAILogoSvg      from '../../logos/megaai-logo.svg?react'
import MegaAIFaviconSvg   from '../../logos/megaai-favicon.svg?react'
import PeopleXLogoSvg     from '../../logos/peoplex-logo.svg?react'

export type LogoProps = {
  className?: string
  width?: number | string
  height?: number | string
}

function makeLogoComponent(Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>) {
  return function LogoComponent({ className, width, height }: LogoProps) {
    return (
      <Svg
        className={['sm-logo', className].filter(Boolean).join(' ')}
        width={width}
        height={height}
      />
    )
  }
}

export const SuperMegaLogo       = makeLogoComponent(SuperMegaLogoSvg)
export const SuperMegaMonoLogo   = makeLogoComponent(SuperMegaMonoLogoSvg)
export const PortalLogo        = makeLogoComponent(PortalLogoSvg)
export const PortalLogoDark    = makeLogoComponent(PortalLogoDarkSvg)
export const PortalLogoStacked = makeLogoComponent(PortalLogoStackedSvg)
export const PortalFavicon     = makeLogoComponent(PortalFaviconSvg)
export const MegaAILogo     = makeLogoComponent(MegaAILogoSvg)
export const MegaAIFavicon  = makeLogoComponent(MegaAIFaviconSvg)
export const PeopleXLogo    = makeLogoComponent(PeopleXLogoSvg)
