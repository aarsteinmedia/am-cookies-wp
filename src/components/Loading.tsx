import { Circle, G, SVG } from '@wordpress/components';

export default function Loading() {
	return (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			width="22"
			height="22"
			stroke="currentcolor"
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
				style={ {
					transformOrigin: 'center',
					animation: 'spinner_zKoa 2s linear infinite',
				} }
			>
				<Circle
					cx="11"
					cy="11"
					r="9.5"
					fill="none"
					strokeWidth="3"
					style={ {
						strokeLinecap: 'round',
						animation: 'spinner_YpZS 1.5s ease-in-out infinite',
					} }
				/>
			</G>
		</SVG>
	);
}
