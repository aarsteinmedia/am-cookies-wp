import { Circle, G, SVG } from '@wordpress/components'

export default function Loading() {
	return (
		<SVG
			height="22"
			stroke="currentcolor"
			width="22"
			xmlns="http://www.w3.org/2000/svg"
		>
			<style>
				{
					/* CSS */ `@keyframes spinner_zKoa {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spinner_YpZS {
            0% {
              stroke-dasharray: 0 150;
              stroke-dashoffset: 0;
            }

            47.5% {
              stroke-dasharray: 42 150;
              stroke-dashoffset: -16;
            }

            95%,
            to {
              stroke-dasharray: 42 150;
              stroke-dashoffset: -59;
            }
          }`
				}
			</style>
			<G
				style={{
					animation: 'spinner_zKoa 2s linear infinite',
					transformOrigin: 'center',
				}}
			>
				<Circle
					cx="11"
					cy="11"
					fill="none"
					r="9.5"
					strokeWidth="3"
					style={{
						animation: 'spinner_YpZS 1.5s ease-in-out infinite',
						strokeLinecap: 'round',
					}}
				/>
			</G>
		</SVG>
	)
}
