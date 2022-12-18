import { __ } from "@wordpress/i18n";
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
} from '@wordpress/block-editor';
import { styles } from "@wordpress/icons";
import { sun, moon, desktop } from "./icons";
import parse from 'html-react-parser';
import blockJson from './block.json';
import './editor.scss';
import './style.scss';

const metadata: BlockConfiguration = blockJson ?? {};

registerBlockType( metadata, {
		icon: styles,
		edit: props => {
			const blockProps: {
				style: {}
			} = useBlockProps();

			const { attributes }: { attributes: { [name: string]: string } } = props;

			const toggleButton = document.getElementById( 'block-' + props?.clientId ) as HTMLDivElement;

			if ( toggleButton ) {
				toggleButton.addEventListener( 'click', () => {
					toggleButton.classList.toggle( 'has-dark-mode' );
				} );
			}

			return (
				<>
					<button { ...blockProps }>
						<span className={ 'wp-block-blockify-dark-mode-toggle__switch' }>
							{ __( 'Toggle Dark Mode', 'blockify-pro' ) }
						</span>
						{ parse( sun ) }
						{ parse( moon ) }
						{ attributes?.className?.includes( 'is-style-dropdown' ) &&
						  parse( desktop )
						}
					</button>
				</>
			);
		},
		save: props => {
			const blockProps = useBlockProps.save();

			const { attributes }: { attributes: { [name: string]: string } } = props;

			return (
				<button { ...blockProps }>
				<span className={ 'wp-block-blockify-dark-mode-toggle__switch' }>
                    { __( 'Toggle Dark Mode', 'blockify-pro' ) }
                </span>
					{ parse( sun ) }
					{ parse( moon ) }
					{ attributes?.className?.includes( 'is-style-dropdown' ) &&
					  parse( desktop )
					}
				</button>
			);
		}
	}
);
