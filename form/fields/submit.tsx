import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import WidthControl from "../../../components/width-control";

const recaptchaSiteKey = window?.['blockify']?.['googleRecaptcha'] ?? null;

registerBlockType( 'blockify/submit', {
    apiVersion: 2,
    title: __( 'Submit', 'blockify' ),
    description: __( 'Displays a submit button', 'blockify' ),
    icon: 'button',
    category: 'blockify-form',
    className: 'wp-block-blockify-submit',
    parent: [
        'blockify/form'
    ],
    keywords: [
        __( 'Form', 'blockify' ),
        __( 'Input', 'blockify' ),
        __( 'Button', 'blockify' ),
    ],
    supports: {
        multiple: false,
        align: false,
        alignWide: false,
        color: {
            gradients: true,
            background: true,
            text: true,
        },
        typography: {
            fontSize: true,
            fontWeight: true,
            lineHeight: true,
            textTransform: true,
        },
        spacing: {
            margin: true,
            padding: true,
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
        }
    },
    attributes: {
        value: {
            type: 'string',
            default: __( 'Submit', 'blockify' )
        },
        width: {
            type: 'string',
            default: 'auto'
        },
        textAlign: {
            type: 'string'
        },
        recaptcha: {
            type: 'boolean',
        },
        siteKey: {
            type: 'string',
            default: 'false'
        }
    },
    edit: ( { attributes, setAttributes } ) => {
        let blockProps            = useBlockProps();
        const [ width, setWidth ] = useState( attributes.width );
        const classArray          = blockProps.className.split( ' ' );
        let classString           = '';

        const { apiKey } = attributes;

        classArray.forEach( classItem => {
            if ( ! classItem.includes( '-color' ) ) {
                classString += ' ' + classItem;
            }
        } );

        blockProps.style = {
            ...blockProps.style,
            width: attributes?.width
        }

        blockProps['data-sitekey']  = recaptchaSiteKey;
        blockProps['data-callback'] = 'onSubmit';
        blockProps['data-action']   = 'submit';

        let classNames = [
            blockProps.className,
            'wp-block-button__link',
            'wp-element-button'
        ];

        if ( recaptchaSiteKey && attributes?.recaptcha ) {
            classNames.push( 'g-recaptcha' );
        }

        blockProps.className = classNames.join( ' ' );

        return (
            <>
                <InspectorControls key="settings">
                    <PanelBody title={ __( 'Submit settings', 'blockify' ) }>
                        <PanelRow>
                            <WidthControl
                                label={ __( 'Button width', 'blockify' ) }
                                width={ width }
                                setWidth={ setWidth }
                                onClick={ key => {
                                    if ( key === width ) {
                                        setAttributes( { width: 'auto' } );
                                    } else {
                                        setAttributes( { width: key } );
                                    }
                                } }
                            />
                            <br/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'Enable reCAPTCHA v3', 'blockify' ) }
                                checked={ attributes?.recaptcha ?? false }
                                onChange={ val => {
                                    setAttributes( {
                                        recaptcha: val
                                    } );
                                } }
                            />
                        </PanelRow>
                        { attributes?.recaptcha &&
						  <PanelRow>
							  <TextControl
								  label={ __( 'API Key', 'blockify' ) }
								  value={ apiKey }
								  help={ __( 'Enter your Google reCAPTCHA v2 API key to enable the recaptcha field. Get your key here https://google.com/recaptcha/admin/site/', 'blockify' ) }
								  onChange={ value => setAttributes( {
                                      apiKey: value,
                                  } ) }
							  />
						  </PanelRow>
                        }
                    </PanelBody>
                </InspectorControls>

                <RichText
                    { ...blockProps }
                    tagName={ 'div' }
                    value={ attributes?.value }
                    placeholder={ __( 'Submit', 'blockify' ) }
                    onChange={ val => setAttributes( {
                        value: val
                    } ) }
                />
            </>
        );
    },
    save: ( { attributes } ) => {
        const blockProps = useBlockProps.save();
        const classArray = blockProps.className.split( ' ' );
        let classString  = '';

        const { recaptchaSiteKey } = attributes;

        blockProps.style = {
            ...blockProps.style,
            width: attributes?.width
        }

        blockProps['data-sitekey']  = recaptchaSiteKey;
        blockProps['data-callback'] = 'onSubmit';
        blockProps['data-action']   = 'submit';

        classArray.forEach( classItem => {
            if ( ! classItem.includes( '-color' ) ) {
                classString += ' ' + classItem;
            }
        } );

        return (
            <RichText.Content
                { ...blockProps }
                tagName={ 'button' }
                className={ blockProps.className + ' wp-block-button__link wp-element-button' }
                value={ attributes.value }
            />
        );
    }
} );
