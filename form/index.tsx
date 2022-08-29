import parse from "html-react-parser";
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
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import metadata from './block.json';
import './field.tsx';
import './checkbox.tsx';
import './submit.tsx';
import './editor.scss';

const mail = () => parse(
    '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve"><path d="M3.260 4.139 C 2.714 4.407,2.279 4.856,2.083 5.352 C 2.000 5.562,2.000 5.579,2.000 12.000 L 2.000 18.437 2.084 18.662 C 2.291 19.214,2.760 19.681,3.270 19.842 C 3.531 19.924,3.641 19.928,6.720 19.961 C 8.469 19.980,12.271 19.997,15.168 19.998 C 20.430 20.000,20.437 20.000,20.662 19.916 C 21.215 19.709,21.682 19.239,21.841 18.730 C 21.922 18.471,21.928 18.341,21.964 15.600 C 21.985 14.027,21.998 11.101,21.991 9.098 L 21.980 5.456 21.830 5.153 C 21.573 4.633,21.076 4.242,20.520 4.122 C 20.259 4.066,13.507 4.004,7.440 4.002 L 3.540 4.001 3.260 4.139 M20.000 7.151 L 20.000 8.302 18.350 9.318 C 17.442 9.876,15.642 10.979,14.350 11.768 L 11.999 13.203 9.650 11.768 C 8.357 10.979,6.558 9.876,5.650 9.318 L 4.000 8.302 4.000 7.151 L 4.000 6.000 12.000 6.000 L 20.000 6.000 20.000 7.151 M5.826 11.425 C 6.812 12.033,8.605 13.132,9.810 13.866 L 11.999 15.203 14.190 13.866 C 15.394 13.131,17.188 12.033,18.174 11.425 C 19.161 10.817,19.976 10.320,19.984 10.320 C 19.993 10.320,20.000 12.048,20.000 14.160 L 20.000 18.000 12.000 18.000 L 4.000 18.000 4.000 14.160 C 4.000 12.048,4.007 10.320,4.016 10.320 C 4.024 10.320,4.839 10.817,5.826 11.425 " stroke="none" fill-rule="evenodd" fill="black"></path></svg>'
);

const template = [
    [ 'blockify/first-name' ],
    [ 'blockify/email' ],
    [ 'blockify/text-area' ],
    [ 'blockify/submit' ]
];

const allowedBlocks = [
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
];

registerBlockType( metadata, {
    icon: mail,
    edit: props => {
        const { attributes, setAttributes }                = props;
        const { successMessage, insertUser, redirectPage } = attributes;

        const blockProps       = useBlockProps();
        const innerBlocksProps = useInnerBlocksProps( blockProps, {
            allowedBlocks: allowedBlocks,
            template: template
        } );

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
                <InspectorControls key={ 'blockify-form-settings' }>
                    <PanelBody title={ __( 'Form Settings', 'blockify' ) }>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Create WordPress user', 'blockify' ) }
                                help={ __( 'If enabled, will attempt to register a new WordPress subscriber with the information provided.', 'blockify' ) }
                                checked={ insertUser }
                                onChange={ value => setAttributes( {
                                    insertUser: value
                                } ) }
                            />
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label={ __( 'Success page', 'blockify' ) }
                                value={ redirectPage }
                                help={ __( 'Select which page users should be redirected to after a successful form submission.', 'blockify' ) }
                                options={ pageOptions }
                                onChange={ value => setAttributes( {
                                    redirectPage: value
                                } ) }
                            />
                        </PanelRow>
                        <PanelRow>
                            <TextareaControl
                                label={ __( 'Success message', 'blockify' ) }
                                help={ __( 'Message to display to users after a successful form submission.', 'blockify' ) }
                                value={ successMessage }
                                onChange={ value => setAttributes( {
                                    successMessage: value
                                } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <form { ...innerBlocksProps }>
                    { innerBlocksProps.children }
                </form>
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

