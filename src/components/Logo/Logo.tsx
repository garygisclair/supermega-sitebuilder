import './Logo.css'

// ── Brand logos ──────────────────────────────────────────────
import SuperMegaLogoSvg      from '../../logos/supermega-logo.svg?react'
import SuperMegaMonoLogoSvg  from '../../logos/supermega-mono-logo.svg?react'
import HubLogoSvg         from '../../logos/hub-logo.svg?react'
import HubLogoDarkSvg     from '../../logos/hub-logo-dark.svg?react'
import HubLogoStackedSvg  from '../../logos/hub-logo-stacked.svg?react'
import HubFaviconSvg      from '../../logos/hub-favicon.svg?react'
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
export const HubLogo        = makeLogoComponent(HubLogoSvg)
export const HubLogoDark    = makeLogoComponent(HubLogoDarkSvg)
export const HubLogoStacked = makeLogoComponent(HubLogoStackedSvg)
export const HubFavicon     = makeLogoComponent(HubFaviconSvg)
export const MegaAILogo     = makeLogoComponent(MegaAILogoSvg)
export const MegaAIFavicon  = makeLogoComponent(MegaAIFaviconSvg)
export const PeopleXLogo    = makeLogoComponent(PeopleXLogoSvg)
