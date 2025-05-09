import Image from 'next/image';
import { urlForImage } from './image';
import { PortableTextReactComponents } from '@portabletext/react';

export const ptComponents: Partial<PortableTextReactComponents> = {
	marks: {
		left: ({ children }: any) => (
			<div className='text-left'>{children}</div>
		),
		center: ({ children }: any) => (
			<div className='text-center w-full'>{children}</div>
		),
		right: ({ children }: any) => (
			<div className='text-right'>{children}</div>
		),
		justify: ({ children }: any) => (
			<div className='text-justify'>{children}</div>
		),
		link: ({ value, children }) => {
			// Read https://css-tricks.com/use-target_blank/
			const { blank, href } = value;
			return blank ? (
				<a href={href} target='_blank' rel='noopener'>
					{children}
				</a>
			) : (
				<a href={href}>{children}</a>
			);
		},
	},
	block: {
		h1: ({ children }: any) => <h2>{children}</h2>,
	},
	types: {
		image: ({
			value,
		}: {
			value: {
				asset: { _ref: string };
				alt?: string;
				height?: number;
				width?: number;
			};
		}) => {
			if (!value?.asset?._ref) {
				return null;
			}

			return (
				<Image
					alt={value.alt || ' '}
					loading='lazy'
					height={value.height || 500}
					width={value.width || 500}
					src={urlForImage(value).format('webp').url()}
					style={{
						width: '100%',
						marginBottom: '24px',
						maxWidth: '36rem',
						borderRadius: '0.5rem',
						margin: '0 auto 1.5rem ',
					}}
					className='rounded-lg mx-auto'
				/>
			);
		},
	},
};
