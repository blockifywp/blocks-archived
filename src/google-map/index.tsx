import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import GoogleMapReact from 'google-map-react';
import {
    PanelBody, PanelRow, TextControl, SelectControl, ToggleControl,
    __experimentalNumberControl as NumberControl,
    __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import Autocomplete from "react-google-autocomplete";
import metadata from "./block.json";
import './editor.scss';

import assassinsCreed from './styles/assassins-creed.json';
import defaultStyle from './styles/default.json';
import interfaceStyle from './styles/interface.json';
import modestStyle from './styles/modest.json';
import nightMode from './styles/night-mode.json';
import shadesOfGrey from './styles/shades-of-grey.json';
import subtleGreyscale from './styles/subtle-greyscale.json';
import ultraLight from './styles/ultra-light.json';
import wyStyle from './styles/wy.json';
import { mapMarker as blockIcon } from "@wordpress/icons";

const styles = {
    'assassins-creed': assassinsCreed,
    'default-light': defaultStyle,
    'interface': interfaceStyle,
    'modest': modestStyle,
    'night-mode': nightMode,
    'shades-of-grey': shadesOfGrey,
    'subtle-greyscale': subtleGreyscale,
    'ultra-light': ultraLight,
    'wy': wyStyle
};

const FlexSpacer = () => {
    return (
        <span style={ {
            display: 'block',
            height: '1em',
            width: '1em',
        } }>{ ' ' }</span>
    )
};

const Marker = ( { lat, lng, text } ) => <div>{ text }</div>;

const Map = ( { apiKey, zoom, lat, lng, lightStyle, darkStyle, darkMode } ) => {
    const windowMatchMedia = window.matchMedia( '(prefers-color-scheme: dark)' );

    let isDark = windowMatchMedia.matches;

    windowMatchMedia.addEventListener( 'change', event => {
        isDark = event.matches;
    } );

    if ( darkMode ) {
        isDark = true;
    }

    return (
        <GoogleMapReact
            bootstrapURLKeys={ {
                key: apiKey,
                libraries: [ 'places' ],
            } }
            defaultCenter={ {
                lat: parseFloat( lat ),
                lng: parseFloat( lng )
            } }
            center={ {
                lat: parseFloat( lat ),
                lng: parseFloat( lng )
            } }
            defaultZoom={ parseFloat( zoom ) }
            zoom={ parseFloat( zoom ) }
            defaultOptions={ {
                styles: styles[isDark ? darkStyle : lightStyle],
            } }
            options={ {
                styles: styles[isDark ? darkStyle : lightStyle],
            } }
        >
            <Marker
                lat={ parseFloat( lat ) }
                lng={ parseFloat( lng ) }
                text={ __( 'Marker', 'blockify' ) }
            />
        </GoogleMapReact>
    );
}

registerBlockType( metadata, {
    icon: blockIcon,
    edit: ( { attributes, setAttributes } ) => {
        const {
                  apiKey,
                  height,
                  width,
                  lat,
                  lng,
                  zoom,
                  lightStyle,
                  darkStyle,
                  address,
                  darkMode
              } = attributes;

        let blockProps = useBlockProps();

        return (
            <div
                { ...blockProps }
                style={ {
                    ...blockProps.style,
                    height: height,
                    width: width
                } }
            >
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Map Settings', 'blockify' ) }
                        initialOpen={ true }
                        className={ 'blockify-google-map' }
                    >
                        <PanelRow>
                            <TextControl
                                label={ __( 'API Key', 'blockify' ) }
                                value={ apiKey }
                                onChange={ value => setAttributes( { apiKey: value } ) }
                            />
                        </PanelRow>
                        <PanelRow>
                            <UnitControl
                                label={ __( 'Height', 'blockify' ) }
                                value={ height }
                                onChange={ val => setAttributes( {
                                    height: val
                                } ) }
                            />
                            <FlexSpacer/>
                            <UnitControl
                                label={ __( 'Width', 'blockify' ) }
                                value={ width }
                                onChange={ val => setAttributes( {
                                    width: val
                                } ) }
                            />
                            <FlexSpacer/>
                            <NumberControl
                                label={ __( 'Zoom', 'blockify' ) }
                                value={ zoom }
                                onChange={ val => setAttributes( {
                                    zoom: val
                                } ) }
                            />
                        </PanelRow>
                        <br/>
                        <label>{ __( 'Address', 'blockify' ) }</label>
                        <PanelRow>
                            <Autocomplete
                                apiKey={ apiKey }
                                onPlaceSelected={ place => {
                                    setAttributes( {
                                        lat: place?.geometry?.location?.lat(),
                                        lng: place?.geometry?.location?.lng(),
                                        address: place?.formatted_address
                                    } )
                                } }
                                options={ {
                                    types: [ 'geocode' ],
                                } }
                                defaultValue={ address }
                            />
                        </PanelRow>
                        <br/>
                        <PanelRow>
                            <SelectControl
                                label={ __( 'Light style', 'blockify' ) }
                                value={ lightStyle }
                                options={ [
                                    {
                                        label: __( 'Default', 'blockify' ),
                                        value: 'default'
                                    },
                                    {
                                        label: __( 'Ultra Light', 'blockify' ),
                                        value: 'ultra-light'
                                    },
                                    {
                                        label: __( 'Subtle greyscale', 'blockify' ),
                                        value: 'subtle-greyscale'
                                    },
                                    {
                                        label: __( 'WY', 'blockify' ),
                                        value: 'wy'
                                    },
                                    {
                                        label: __( 'Interface', 'blockify' ),
                                        value: 'interface'
                                    },
                                ] }
                                onChange={ value => setAttributes( {
                                    lightStyle: value
                                } ) }
                            />
                            <FlexSpacer/>
                            <SelectControl
                                label={ __( 'Dark style', 'blockify' ) }
                                value={ darkStyle }
                                options={ [
                                    {
                                        label: __( 'Night mode', 'blockify' ),
                                        value: 'night-mode'
                                    },
                                    {
                                        label: __( 'Shades of grey', 'blockify' ),
                                        value: 'shades-of-grey'
                                    },
                                    {
                                        label: __( 'Assassins Creed', 'blockify' ),
                                        value: 'assassins-creed'
                                    },
                                    {
                                        label: __( 'Modest', 'blockify' ),
                                        value: 'modest'
                                    },
                                    {
                                        label: __( 'Default', 'blockify' ),
                                        value: 'default'
                                    },
                                ] }
                                onChange={ value => setAttributes( {
                                    darkStyle: value
                                } ) }
                            />
                        </PanelRow>
                        <ToggleControl
                            label={ __( 'Toggle dark mode preview', 'blockify' ) }
                            help={ __( '', 'blockify' ) }
                            checked={ darkMode }
                            onChange={ value => setAttributes( {
                                darkMode: value
                            } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <Map apiKey={ apiKey } zoom={ zoom } lat={ lat } lng={ lng } lightStyle={ lightStyle } darkStyle={ darkStyle } darkMode={ darkMode }/>
            </div>
        )
    },
    save: ( { attributes } ) => {
        const {
                  apiKey,
                  height,
                  width,
                  lat,
                  lng,
                  zoom,
                  lightStyle,
                  darkStyle,
                  darkMode
              } = attributes;

        let blockProps = useBlockProps.save();

        return (
            <div
                { ...blockProps }
                style={ {
                    ...blockProps.style,
                    height: height,
                    width: width
                } }
            >
                <Map apiKey={ apiKey } zoom={ zoom } lat={ lat } lng={ lng } lightStyle={ lightStyle } darkStyle={ darkStyle } darkMode={ darkMode }/>
            </div>
        )
    }
} );
