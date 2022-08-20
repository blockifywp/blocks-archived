import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps,
    InnerBlocks,
    useInnerBlocksProps,
    InspectorControls
} from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import {
    PanelRow,
    PanelBody,
    ToggleControl,
    SelectControl,
    TextareaControl
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import metadata from './block.json';
import './field.tsx';
import './checkbox.tsx';
import './submit.tsx';
import './editor.scss';

registerBlockType( metadata, {
    edit: props => {
        const { attributes, setAttributes }                = props;
        const { successMessage, insertUser, redirectPage } = attributes;
        const blockProps                                   = useBlockProps();
        const innerBlocksProps                             = {
            ...useInnerBlocksProps(),
            allowedBlocks: [
                'blockify/email',
                'blockify/checkbox',
                'blockify/first-name',
                'blockify/last-name',
                'blockify/phone',
                'blockify/url',
                'blockify/number',
                'blockify/password',
                'blockify/text-area',
                'blockify/submit',
            ],
            template: [
                [ 'blockify/email' ],
                [ 'blockify/submit' ]
            ]
        }

        const [ pageOptions, setPageOptions ] = useState( [] );

        const defaultOption = {
            value: 0,
            label: __( 'Default (current page/post)', 'blockify' )
        };

        //const postTitlesList = useSelect( select => select( 'core' ).getEntityRecords( 'postType', 'post', { ['_fields']: 'id,title' } ), [] );

        useEffect( () => {
            apiFetch( { path: `wp/v2/pages` } ).then(
                ( result: object[] ) => {
                    let options = [];

                    result.forEach( post => {
                        options.push( {
                            value: post['id'],
                            label: post['title']?.rendered
                        } )
                    } );

                    setPageOptions( [ defaultOption, ...options ] );
                }
            );
        }, [] );

        return (
            <>
                <InspectorControls key="settings">
                    <PanelBody title={ __( 'Newsletter Settings', 'blockify' ) }>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Create WordPress user', 'blockify' ) }
                                help={ __( 'Registers a new WordPress subscriber.', 'blockify' ) }
                                checked={ insertUser }
                                onChange={ value => setAttributes( {
                                    insertUser: value
                                } ) }
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label={ __( 'Redirect page', 'blockify' ) }
                                value={ redirectPage }
                                options={ pageOptions }
                                onChange={ value => setAttributes( {
                                    redirectPage: value
                                } ) }
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextareaControl
                                label={ __( 'Success message', 'blockify' ) }
                                value={ successMessage }
                                onChange={ value => setAttributes( {
                                    successMessage: value
                                } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <form { ...blockProps }>{ innerBlocksProps.children }</form>
            </>
        );
    },
    save: () => {
        const blockProps = useBlockProps.save();

        return (
            <form { ...blockProps }><InnerBlocks.Content/></form>
        );
    }
} );

