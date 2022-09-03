import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    TextControl,
    ButtonGroup,
    Button,
    Flex,
    FlexBlock
} from '@wordpress/components';
import { update } from '@wordpress/icons';
import {useState} from "@wordpress/element";

registerBlockType( 'blockify/recaptcha', {
        apiVersion: 2,
        title: __( 'reCaptcha v2', 'blockify' ),
        description: __( 'Displays a Google reCaptcha v2 field. (v3 can be enabled with the Submit block). Enter your API Key from the Blockify global settings tab on any page or post.', 'blockify' ),
        icon: update,
        category: 'blockify-form',
        className: 'wp-block-blockify-recaptcha',
        parent: [
            'blockify/form'
        ],
        keywords: [
            __( 'Google', 'blockify' ),
            __( 'Recaptcha', 'blockify' ),
            __( 'Confirm', 'blockify' ),
        ],
        supports: {
            multiple: false,
            align: true,
            alignWide: false,
            spacing: {
                margin: true,
            },
        },
        attributes: {
            apiKey: {
                type: 'string',
                default: 'false'
            },
            colorScheme: {
                type: 'string',
                default: window?.['blockify']?.['darkMode'] ? 'auto' : 'light'
            }
        },
        edit: ( { attributes, setAttributes } ) => {
            let blockProps = useBlockProps();

            const { apiKey, colorScheme } = attributes;

            blockProps.style = {
                ...blockProps.style,
                width: attributes?.width
            }

            const onClick = key => {
                setAttributes( {
                    colorScheme: key
                } );
            }

            let matchMedia = ( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ) );

            let [ osPreference, setOsPreference] = useState( matchMedia.matches ? 'dark' : 'light' );

            matchMedia.addEventListener( 'change', () => {
                setOsPreference( matchMedia.matches ? 'dark' : 'light' );
            } );

            return (
                <>
                    <InspectorControls>
                        <PanelBody
                            title={ __( 'reCaptcha Settings', 'blockify' ) }
                            className={ 'blockify-recaptcha-settings' }
                        >
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
                            <PanelRow>
                                <Flex
                                    direction={ 'column' }
                                >
                                    <FlexBlock>
                                        { __( 'Color Scheme', 'blockify' ) }
                                    </FlexBlock>
                                    <FlexBlock>
                                        <ButtonGroup aria-label={ __( 'Color Scheme', 'blockify' ) }>
                                            <Button
                                                isSmall={ true }
                                                value={ 'auto' }
                                                variant={
                                                    'auto' === colorScheme ? 'primary' : undefined
                                                }
                                                onClick={ () => onClick( 'auto' ) }
                                            >
                                                { __( 'Auto', 'blockify' ) }
                                            </Button>
                                            <Button
                                                isSmall={ true }
                                                value={ 'light' }
                                                variant={
                                                    'light' === colorScheme ? 'primary' : undefined
                                                }
                                                onClick={ () => onClick( 'light' ) }
                                            >
                                                { __( 'Light', 'blockify' ) }
                                            </Button>
                                            <Button
                                                isSmall={ true }
                                                value={ 'dark' }
                                                variant={
                                                    'dark' === colorScheme ? 'primary' : undefined
                                                }
                                                onClick={ () => onClick( 'dark' ) }
                                            >
                                                { __( 'Dark', 'blockify' ) }
                                            </Button>
                                        </ButtonGroup>
                                    </FlexBlock>
                                </Flex>
                            </PanelRow>
                        </PanelBody>
                    </InspectorControls>
                    <div { ...blockProps }>
                        <img
                            width={ 300 }
                            src={ window?.['blockify']?.['pluginUrl'] + 'assets/img/recaptcha-' + ( colorScheme === 'auto' ? osPreference : colorScheme ) + '.png' }
                            alt={ __( 'Google reCaptcha V3', 'blockify' ) }
                        />
                    </div>
                </>
            );
        },
        save: ( { attributes } ) => {
            let blockProps = useBlockProps.save();

            blockProps.className += ' g-recaptcha';
            blockProps['data-sitekey'] = attributes?.apiKey ?? 'false';
            blockProps['data-theme']   = attributes?.colorScheme ?? 'auto';

            return <div { ...blockProps }/>;
        }
    }
);
