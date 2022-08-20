import { __ } from "@wordpress/i18n";
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import { useBlockProps } from '@wordpress/block-editor';
import { next } from "@wordpress/icons";
import metadata from './block.json';
import './editor.scss';

registerBlockType( metadata, {
    icon: next,
    edit: ( { attributes } ) => {
        const blockProps  = useBlockProps();
        const placeholder = <p>{ __( 'Home / Page', 'blockify' ) }</p>;

        return (
            <div { ...blockProps }>
                <ServerSideRender
                    block={ 'blockify/breadcrumbs' }
                    attributes={ attributes }
                    EmptyResponsePlaceholder={ () => placeholder }
                />
            </div>
        );
    },

    save: () => {
        const blockProps = useBlockProps.save();

        return <div { ...blockProps }>{ '' }</div>;
    }
} );
