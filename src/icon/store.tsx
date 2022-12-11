import apiFetch from "@wordpress/api-fetch";
import { createReduxStore, register } from '@wordpress/data';
import metadata from './block.json';

export const DEFAULT_STATE = {
    icons: {
        wordpress: {
            'star-empty': metadata.attributes.svgString.default
        }
    },
};

export default { DEFAULT_STATE };

const actions = {
    setIcons( icons ) {
        return {
            type: 'SET_ICONS',
            icons,
        };
    },
    getIcons( path ) {
        return {
            type: 'GET_ICONS',
            path,
        };
    },
};

const reducer = ( state = DEFAULT_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_ICONS': {
            return {
                ...state,
                icons: action.icons,
            };
        }
        default: {
            return state;
        }
    }
};

const selectors = {
    getIcons( state ) {
        const { icons } = state;
        return icons;
    },
};

const controls  = {
    GET_ICONS( action ) {
        return apiFetch( { path: action.path } );
    },
};

const resolvers = {
    * getIcons() {
        const icons = yield actions.getIcons( '/blockify/v1/icons/' );
        return actions.setIcons( icons );
    },
};

register( createReduxStore( 'blockify/icons', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
} ) );
