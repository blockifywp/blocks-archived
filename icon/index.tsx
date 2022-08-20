import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    InspectorControls,
    useBlockProps,
    BlockControls,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
    CustomSelectControl,
    PanelBody,
    SelectControl,
    ToolbarButton,
    ToolbarGroup,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import {
    flipHorizontal as flipHorizontalIcon,
    flipVertical as flipVerticalIcon,
} from '@wordpress/icons';
import parse from 'html-react-parser';
import { DEFAULT_STATE } from "./store";
import './store';
import './editor.scss';
import { CSSProperties } from 'react';
import metadata from './block.json';

const defaultIcon  = metadata?.attributes?.svgString?.default;
const defaultWidth = '3em'; // TODO: Worth adding a filter?

const getContainerClasses = attributes => {
    const {
              flipVertical,
              flipHorizontal,
              boxShadowGradient,
              boxShadowColor
          } = attributes;

    let containerClasses = '';

    if ( flipVertical ) {
        containerClasses += ' flip-vertical';
    }

    if ( flipHorizontal ) {
        containerClasses += ' flip-horizontal';
    }

    if ( boxShadowGradient && boxShadowColor ) {
    }

    containerClasses += ' has-custom-box-shadow';

    return containerClasses;
}

registerBlockType( metadata, {
    edit: ( { attributes, setAttributes } ) => {
        const blockProps                = useBlockProps();
        const { style: containerStyle } = blockProps;

        delete containerStyle['padding'];
        delete containerStyle['paddingTop'];
        delete containerStyle['paddingRight'];
        delete containerStyle['paddingBottom'];
        delete containerStyle['paddingLeft'];

        let {
                icon,
                iconSet,
                svgString,
                iconWidth,
                iconColor,
                iconGradient,
                backgroundColor,
                backgroundGradient,
                flipHorizontal,
                flipVertical,
                style
            } = attributes;

        let iconSetOptions = [];
        let iconOptions    = {};

        let { icons } = useSelect( select => {
            return {
                icons: select( 'blockify/icons' ).getIcons(),
            };
        }, [] ) ?? DEFAULT_STATE;

        Object.keys( icons ).forEach( set => {
            let label = set.split( '-' ).join( ' ' );

            label = 'wordpress' === label ? 'WordPress' : label;

            iconSetOptions.push( {
                label: label,
                value: set,
            } );

            iconOptions[set] = [];

            Object.keys( icons[set] ).forEach( iconName => {
                if ( iconName !== icon ) {
                    iconOptions[set].push( {
                        name: parse( icons[set][iconName] ),
                        key: iconName,
                    } );
                }
            } );

            if ( icons?.[iconSet]?.[icon] ) {
                iconOptions[set].unshift( {
                    name: parse( icons[iconSet][icon] ),
                    key: icon,
                } );
            }
        } );

        const IconPreview = props => {
            const currentIconSvg = iconOptions?.[iconSet]?.filter( option => {
                return option?.key === icon;
            } )?.[0]?.name;

            return (
                <div className={ 'blockify-icon-preview' }>
                    { currentIconSvg && (
                        <>
                            { currentIconSvg }
                            <span>{ icon.replace( '-', ' ' ) }</span>
                        </>
                    ) }
                </div>
            );
        }

        return (
            <div { ...blockProps } style={ {} }>
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton
                            icon={ flipHorizontalIcon }
                            label={ __( 'Flip Horizontal', 'blockify' ) }
                            onClick={ () =>
                                setAttributes( {
                                    flipHorizontal: ! flipHorizontal,
                                } )
                            }
                            isPressed={ flipHorizontal }
                        />
                        <ToolbarButton
                            icon={ flipVerticalIcon }
                            label={ __( 'Flip Vertical', 'blockify' ) }
                            onClick={ () =>
                                setAttributes( {
                                    flipVertical: ! flipVertical,
                                } )
                            }
                            isPressed={ flipVertical }
                        />
                    </ToolbarGroup>
                </BlockControls>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Icon Settings', 'blockify' ) }
                        initialOpen={ true }
                        className={ 'blockify-icon-settings' }
                    >
                        <SelectControl
                            label={ __( 'Select Icon Set', 'blockify' ) }
                            value={ iconSet }
                            options={ iconSetOptions }
                            onChange={ value => setAttributes( {
                                iconSet: value
                            } ) }
                        />
                        <IconPreview/>
                        <CustomSelectControl
                            label={ __( 'Select Icon', 'blockify' ) }
                            options={ iconOptions?.[iconSet] ?? DEFAULT_STATE }
                            value={ icons?.[iconSet]?.[icon] }
                            className={ 'blockify-icon-setting' }
                            onChange={ value => {
                                setAttributes( {
                                    icon: value.selectedItem.key,
                                    svgString: icons?.[iconSet]?.[value.selectedItem.key] ?? defaultIcon
                                } );
                            } }
                        />
                        <br/>

                        <UnitControl
                            label={ __( 'Icon Width', 'blockify' ) }
                            value={ iconWidth ?? defaultWidth }
                            onChange={ value => setAttributes( {
                                iconWidth: value
                            } ) }
                            isPressEnterToChange={ true }
                        />

                    </PanelBody>
                    <PanelColorGradientSettings
                        title={ __( 'Color', 'blockify' ) }
                        settings={ [
                            {
                                colorValue: iconColor,
                                gradientValue: iconGradient,
                                label: __( 'Icon', 'blockify' ),
                                onColorChange: val => setAttributes( {
                                    iconColor: val
                                } ),
                                onGradientChange: val => setAttributes( {
                                    iconGradient: val
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
                </InspectorControls>
                <div
                    className={ 'blockify-icon-container' + getContainerClasses( attributes ) }
                    style={ {
                        ...containerStyle,
                        background: backgroundGradient ?? backgroundColor,
                        width: 'calc(' + (iconWidth ?? defaultWidth) + ' + ' + style?.spacing?.padding?.left + ' + ' + style?.spacing?.padding?.right + ')'
                    } }
                >
                    <span
                        data-icon={ icon }
                        className={ 'blockify-icon-mask' }
                        style={ {
                            height: iconWidth ?? defaultWidth,
                            width: iconWidth ?? defaultWidth,
                            marginTop: style?.spacing?.padding?.top,
                            marginRight: style?.spacing?.padding?.right,
                            marginBottom: style?.spacing?.padding?.bottom,
                            marginLeft: style?.spacing?.padding?.left,
                            background: iconGradient ?? iconColor,
                            WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,' + ( svgString.trim() ?? defaultIcon ) + '\')'
                        } as CSSProperties }
                    />
                </div>
            </div>
        );

    },
    save: ( { attributes } ) => {
        const blockProps = useBlockProps.save();
        const {
                  icon,
                  svgString,
                  iconWidth,
                  iconColor,
                  iconGradient,
                  backgroundGradient,
                  backgroundColor,
                  style
              }          = attributes;

        const { style: containerStyle } = blockProps;

        delete containerStyle['padding'];
        delete containerStyle['paddingTop'];
        delete containerStyle['paddingRight'];
        delete containerStyle['paddingBottom'];
        delete containerStyle['paddingLeft'];

        return (
            <div { ...blockProps } style={ {} }>
                <div
                    className={ 'blockify-icon-container' + getContainerClasses( attributes ) }
                    style={ {
                        ...containerStyle,
                        background: backgroundGradient ?? backgroundColor,
                        width: 'calc(' + ( iconWidth ?? defaultWidth) + ' + ' + style?.spacing?.padding?.left + ' + ' + style?.spacing?.padding?.right + ')'
                    } }
                >
                    <span
                        data-icon={ icon }
                        className={ 'blockify-icon-mask' }
                        style={ {
                            height: iconWidth ?? defaultWidth,
                            width: iconWidth ?? defaultWidth,
                            marginTop: style?.spacing?.padding?.top,
                            marginRight: style?.spacing?.padding?.right,
                            marginBottom: style?.spacing?.padding?.bottom,
                            marginLeft: style?.spacing?.padding?.left,
                            background: iconGradient ?? iconColor,
                            WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,' + ( svgString.trim() ?? defaultIcon ) + '\')'
                        } as CSSProperties }
                    />
                </div>
            </div>
        );
    }
} );
