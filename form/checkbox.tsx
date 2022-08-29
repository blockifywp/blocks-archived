import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    ToggleControl
} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';

const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 538 615" fill="currentColor">
        <path d="M211.8 339.8c-10.9 10.9-28.7 10.9-39.6 0l-64-64c-10.93-10.9-10.93-28.7 0-39.6 10.9-10.9 28.7-10.9 39.6 0l44.2 44.2 108.2-108.2c10.9-10.9 28.7-10.9 39.6 0 10.9 10.9 10.9 28.7 0 39.6l-128 128zM0 96c0-35.35 28.65-64 64-64h320c35.3 0 64 28.65 64 64v320c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V96zm48 0v320c0 8.8 7.16 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.84-7.2-16-16-16H64c-8.84 0-16 7.16-16 16z"/>
    </svg>
);

registerBlockType( 'blockify/checkbox', {
    apiVersion: 2,
    title: __( 'Checkbox', 'blockify' ),
    description: __( 'Displays a checkbox field', 'blockify' ),
    icon: icon,
    category: 'blockify-form',
    parent: [
        'blockify/form'
    ],
    keywords: [
        __( 'Terms', 'blockify' ),
        __( 'Tick', 'blockify' ),
        __( 'Agree', 'blockify' ),
    ],
    supports: {
        color: {
            gradients: true,
            background: true,
            text: true,
        },
        spacing: {
            margin: true,
            padding: true,
            blockGap: true
        },
        __experimentalBorder: {
            width: true,
            style: true,
            color: true,
            radius: true,
            __experimentalDefaultControls: {
                width: true,
                color: true
            }
        },
        typography: {
            fontSize: true,
            lineHeight: true,
        },
    },
    attributes: {
        styles: {
            type: 'object'
        },
        style: {
            type: 'object',
            default: {
                spacing: {
                    margin: {
                        top: '1em',
                        bottom: '1.5em',
                    }
                },
                typography: {
                    lineHeight: '1',
                },
            }
        },
        id: {
            type: 'string',
            default: 'checkbox-1'
        },
        value: {
            type: 'string',
            default: __( 'Agree to terms and conditions.', 'blockify' )
        },
        label: {
            type: 'string',
            default: __( 'Checkbox', 'blockify' )
        },
        isRequired: {
            type: 'boolean',
            default: false
        },
    },
    edit: props => {
        const {
                  attributes,
                  setAttributes
              }          = props;
        const blockProps = {
            ...useBlockProps()
        };

        return (
            <>
                <InspectorControls key="settings">
                    <PanelBody title={ 'Checkbox settings' } className={ 'blockify-input-settings' }>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Required', 'blockify' ) }
                                checked={ attributes.isRequired }
                                onChange={ ( val ) => {
                                    setAttributes( {
                                        isRequired: val
                                    } );
                                } }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <div
                    { ...blockProps }
                >
                    <input
                        type={ 'checkbox' }
                        id={ attributes.id }
                        name={ attributes.id }
                        value={ attributes.value }
                        onClick={ value => setAttributes( {
                            checked: value
                        } ) }
                        className={ attributes?.className ? attributes.className + ' blockify-blockify-checkbox' : ' blockify-checkbox' }
                        data-required={ attributes.isRequired }
                    />
                    <RichText
                        tagName={ 'span' }
                        value={ attributes.label }
                        htmlFor={ attributes.id }
                        onChange={ ( val ) => setAttributes( {
                            label: val
                        } ) }
                    />
                </div>
            </>
        );
    },
    save: props => {
        const { attributes } = props;
        const blockProps     = {
            ...useBlockProps.save()
        };

        return (
            <>
                <div { ...blockProps }>
                    <input
                        id={ 'id' }
                        name={ 'name' }
                        type={ 'checkbox' }
                        value={ attributes.value }
                        className={ attributes?.className ? attributes.className + ' blockify-blockify-checkbox' : ' blockify-checkbox' }
                        data-required={ attributes.isRequired }
                    />
                    <RichText.Content
                        tagName={ 'label' }
                        htmlFor={ 'id' }
                        value={ attributes.label }
                    />
                </div>
            </>
        );
    }
} );
