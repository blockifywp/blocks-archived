import { __ } from '@wordpress/i18n';
import {
    registerBlockType,
    registerBlockStyle
} from '@wordpress/blocks';
import {
    useBlockProps,
    InspectorControls,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings
} from '@wordpress/block-editor';
import domReady from "@wordpress/dom-ready";
import {
    Panel,
    PanelBody,
    PanelRow,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import './editor.scss';
import metadata from './block.json';

domReady( () => {
    registerBlockStyle( metadata.name, {
        name: 'angle',
        label: __( 'Angle', 'blockify' ),
        isDefault: true,
    } );
    registerBlockStyle( metadata.name, {
        name: 'curve',
        label: __( 'Curve', 'blockify' ),
    } );
    registerBlockStyle( metadata.name, {
        name: 'round',
        label: __( 'Round', 'blockify' ),
    } );
    registerBlockStyle( metadata.name, {
        name: 'wave',
        label: __( 'Wave', 'blockify' ),
    } );
    registerBlockStyle( metadata.name, {
        name: 'fade',
        label: __( 'Fade', 'blockify' ),
    } );
} );

registerBlockType( metadata, {
    edit: props => {
        const {
                  attributes,
                  setAttributes
              }          = props;
        const {
                  height,
                  backgroundColor,
                  backgroundGradient,
                  foregroundColor,
                  foregroundGradient,
              }          = attributes;
        const blockProps = useBlockProps();

        return (
            <div
                { ...blockProps }
                style={ {
                    ...blockProps.style,
                    height: height,
                    background: backgroundGradient ?? backgroundColor
                } }
            >
                <InspectorControls>
                    <PanelColorGradientSettings
                        title={ __( 'Color', 'blockify' ) }
                        settings={ [
                            {
                                colorValue: foregroundColor,
                                gradientValue: foregroundGradient,
                                label: __( 'Foreground', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    foregroundColor: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    foregroundGradient: val
                                } ),
                            },
                            {
                                colorValue: backgroundColor,
                                gradientValue: backgroundGradient,
                                label: __( 'Background', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    backgroundColor: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    backgroundGradient: val
                                } ),
                            }
                        ] }
                    />
                    <Panel>
                        <PanelBody title={ __( 'Dimensions', 'blockify' ) }>
                            <PanelRow>
                                <UnitControl
                                    label={ __( 'Height', 'blockify' ) }
                                    value={ height }
                                    onChange={ val => setAttributes( {
                                        height: val
                                    } ) }
                                />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                <div
                    className={ 'blockify-divider-mask' }
                    style={ {
                        background: foregroundGradient ?? foregroundColor,
                    } }
                >
                </div>
            </div>
        );
    },

    save: props => {
        const { attributes } = props;
        const {
                  height,
                  backgroundColor,
                  backgroundGradient,
                  foregroundColor,
                  foregroundGradient
              }              = attributes;
        const blockProps     = useBlockProps.save();

        return (
            <div
                { ...blockProps }
                style={ {
                    ...blockProps.style,
                    height: height,
                    background: backgroundGradient ?? backgroundColor
                } }
            >
                <div
                    className={ 'blockify-divider-mask' }
                    style={ {
                        background: foregroundGradient ?? foregroundColor,
                    } }
                >
                </div>
            </div>
        );
    }
} );
