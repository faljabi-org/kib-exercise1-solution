import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import validator from 'validator';

import { blueGrey, common } from '@mui/material/colors';

import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

import { APP_STANDARD_SHEET_TYPE } from 'constants/appConstants';
import { DEFAULT_LAYER_EFFECT } from 'constants/mapConstants';
import {
    SELECTED_USER_LOCATION_LAYER_ID,
    USERS_LAYER_ID,
    USER_MAP_ITEM_SIZE,
    USER_MAP_ITEM_SVG_PATH,
    USER_MAP_ITEM_COLOR
} from 'constants/usersConstants';

import useMapViewHelper from 'hooks/map/use-map-view-helper';

import { server } from 'lib/@axios';

const useUsersViewModel = ({ mapView, viewVisible }) => {

    const { t } = useTranslation();

    const {

        highlightFeatureOnMap,
        clearFeatureHighlightOnMap,
        selectFeatureOnMap,
        clearFeautureSelectionOnMap

    } = useMapViewHelper({ mapView });

    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [usersError, setUsersError] = useState(null);
    const [usersRefreshId, setUsersRefreshId] = useState(uuidv4());

    const [usersLayerRefreshId, setUsersLayerRefreshId] = useState(uuidv4());

    const [usersSearchText, setUsersSearchText] = useState('');
    const [usersSearchTextDebounced] = useDebounce(usersSearchText, 300);

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [zoomToSelectedUser, setZoomToSelectedUser] = useState(false);

    const [manageUserDialogVisible, setManageUserDialogVisible] = useState(false);
    const [manageUserDialogMode, setManageUserDialogMode] = useState(0);
    const [manageUserStarted, setManageUserStarted] = useState(false);
    const [manageUserValidationResults, setManageUserValidationResults] = useState([]);

    const [addUserLocation, setAddUserLocation] = useState(null);
    const [addUserResult, setAddUserResult] = useState(false);
    const [addUserLoading, setAddUserLoading] = useState(false);
    const [addUserError, setAddUserError] = useState(null);

    const [editUserResult, setEditUserResult] = useState(false);
    const [editUserLoading, setEditUserLoading] = useState(false);
    const [editUserError, setEditUserError] = useState(null);

    const [editUserLocationStarted, setEditUserLocationStarted] = useState(null);
    const [editUserLocationResult, setEditUserLocationResult] = useState(false);
    const [editUserLocationLoading, setEditUserLocationLoading] = useState(false);
    const [editUserLocationError, setEditUserLocationError] = useState(false);

    const [deleteUserResult, setDeleteUserResult] = useState(false);
    const [deleteUserLoading, setDeleteUserLoading] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(null);

    const selectedUser = useMemo(_ => users.find(user => user.id === selectedUserId?.value), [users, selectedUserId]);

    const highlightUserOnMap = useCallback(userId => {

        if (selectedUser) return;

        highlightFeatureOnMap({
            layerId: USERS_LAYER_ID,
            featureId: userId
        });

    }, [selectedUser, highlightFeatureOnMap]);

    const clearUserHighlightOnMap = useCallback(_ => {

        if (selectedUser) return;

        clearFeatureHighlightOnMap({ layerId: USERS_LAYER_ID });

    }, [selectedUser, clearFeatureHighlightOnMap]);

    const selectUserOnMap = useCallback(({ layerId, featureId }) => {

        selectFeatureOnMap({ layerId, featureId });

    }, [selectFeatureOnMap]);

    const clearUserSelectionOnMap = useCallback(_ => {

        clearFeautureSelectionOnMap({ layerId: USERS_LAYER_ID });

    }, [clearFeautureSelectionOnMap]);

    const zoomToSelectedUserOnMap = useCallback(_ => {

        setZoomToSelectedUser(true);

    }, []);

    const updateUsersSearchText = useCallback(searchText => {

        setUsersLoading(true);
        setUsersSearchText(searchText);

    }, []);

    const startAddUser = useCallback(_ => {

        if (!mapView?.ready) return;

        mapView.container.style.cursor = 'crosshair';

        setManageUserStarted(true);
        setManageUserDialogMode(0);

    }, [mapView]);

    const endAddUser = useCallback(_ => {

        if (!mapView?.ready) return;

        mapView.container.style.cursor = 'auto';

        setManageUserStarted(false);
        setManageUserValidationResults([]);
        setAddUserLocation(null);
        setManageUserDialogVisible(false);

    }, [mapView]);

    const startEditUser = useCallback(_ => {

        if (!mapView?.ready) return;

        setManageUserStarted(true);
        setManageUserDialogMode(1);
        setManageUserDialogVisible(true);

    }, [mapView]);

    const endEditUser = useCallback(_ => {

        if (!mapView?.ready) return;

        setManageUserStarted(false);
        setManageUserValidationResults([]);
        setManageUserDialogVisible(false);

    }, [mapView]);

    const startEditUserLocation = useCallback(_ => {

        if (!mapView?.ready) return;

        mapView.container.style.cursor = 'crosshair';

        setEditUserLocationStarted(true);

    }, [mapView]);

    const endEditUserLocation = useCallback(_ => {

        if (!mapView?.ready) return;

        mapView.container.style.cursor = 'auto';

        setEditUserLocationStarted(false);

    }, [mapView]);

    const selectUser = useCallback(userId => {

        setZoomToSelectedUser(false);

        setSelectedUserId({
            type: APP_STANDARD_SHEET_TYPE.USER,
            value: userId,
            selectionTime: (new Date()).getTime()
        });

    }, []);

    const clearUserSelection = useCallback(_ => {

        setSelectedUserId(null);

    }, []);

    const setUserLocation = useCallback(mapPoint => {

        let { latitude, longitude } = mapPoint;

        setAddUserLocation({ latitude, longitude });
        setManageUserDialogMode(0);
        setManageUserDialogVisible(true);
        setManageUserStarted(true);

    }, []);

    const validateManageUserInputs = useCallback(user => {

        let { name, username, email, phone, website,
            company: { name: companyName, catchPhrase: companyCatchPhrase, bs: companyBS },
            address: { city, street, suite, zipcode } } = user;

        let validationResults = [];

        if (!validator.isLength(name, { min: 1, max: 100 }))
            validationResults.push({ name: t('users@validNameRequired') });

        if (!validator.isLength(username, { min: 1, max: 30 }) || !validator.matches(username, "^[a-zA-Z0-9_.-]*$"))
            validationResults.push({ username: t('users@validUsernameRequired') });

        if (!validator.isEmail(email))
            validationResults.push({ email: t('users@validEmailRequired') });

        if (!validator.isLength(phone, { min: 1, max: 30 }))
            validationResults.push({ phone: t('users@validNameRequired') });

        if (website.trim() && !validator.isURL(website, { require_protocol: true }))
            validationResults.push({ website: t('users@validWebsiteRequired') });

        if (!validator.isLength(companyName, { min: 1, max: 100 }))
            validationResults.push({ companyName: t('users@validCompanyNameRequired') });

        if (!validator.isLength(companyCatchPhrase, { min: 0, max: 100 }))
            validationResults.push({ companyCatchPhrase: t('users@validCompanyCatchPhraseRequired') });

        if (!validator.isLength(companyBS, { min: 0, max: 100 }))
            validationResults.push({ companyBS: t('users@validCompanyBSRequired') });

        if (!validator.isLength(city, { min: 1, max: 100 }))
            validationResults.push({ city: t('users@validCityRequired') });

        if (!validator.isLength(street, { min: 1, max: 100 }))
            validationResults.push({ street: t('users@validStreetRequired') });

        if (!validator.isLength(suite, { min: 0, max: 100 }))
            validationResults.push({ suite: t('users@validSuiteRequired') });

        if (!validator.isLength(zipcode, { min: 0, max: 100 }))
            validationResults.push({ zipcode: t('users@validZipcodeRequired') });

        setManageUserValidationResults([...validationResults]);

        return validationResults;

    }, [t]);

    const addUser = useCallback(user => {

        let validationResults = validateManageUserInputs(user);

        if (validationResults.length > 0) return;

        setAddUserLoading(true);

        server
            .put('users', {
                id: uuidv4(),
                ...user,
                address: {
                    ...user.address,
                    geo: {
                        lat: addUserLocation.latitude.toString(),
                        lng: addUserLocation.longitude.toString()
                    }
                },
                guid: uuidv4()
            })
            .then(response => {

                let { result } = response.data;

                if (result === true) {

                    setAddUserResult(result);
                    endAddUser();

                    setUsersRefreshId(uuidv4());
                }
            })
            .catch(error => {

                setAddUserError(new Error(
                    error.response?.data?.message ||
                    [error.message]
                ));
            })
            .finally(_ => {

                setAddUserLoading(false);
            });

    }, [addUserLocation, validateManageUserInputs, endAddUser]);

    const editUser = useCallback(user => {

        let validationResults = validateManageUserInputs(user);

        if (validationResults.length > 0) return;

        setEditUserLoading(true);

        server
            .put('users', {
                id: selectedUser.id,
                ...user,
                address: {
                    ...user.address,
                    geo: {
                        ...selectedUser.address.geo
                    }
                },
                guid: uuidv4()
            })
            .then(response => {

                let { result } = response.data;

                if (result === true) {

                    setEditUserResult(result);
                    endEditUser();

                    setUsersRefreshId(uuidv4());
                }
            })
            .catch(error => {

                setEditUserError(new Error(
                    error.response?.data?.message ||
                    [error.message]
                ));
            })
            .finally(_ => {

                setEditUserLoading(false);
            });

    }, [selectedUser, validateManageUserInputs, endEditUser]);

    const editSelectedUserLocation = useCallback(location => {

        setEditUserLocationLoading(true);

        server
            .put('users', {
                ...selectedUser,
                id: selectedUser.id.toString(),
                address: {
                    ...selectedUser.address,
                    geo: {
                        lng: location.longitude.toString(),
                        lat: location.latitude.toString()
                    }
                },
                guid: uuidv4()
            })
            .then(response => {

                let { result } = response.data;

                if (result === true) {

                    setEditUserLocationResult(result);

                    setUsersRefreshId(uuidv4());
                }

            })
            .catch(error => {

                setEditUserLocationError(new Error(
                    error.response?.data?.message ||
                    [error.message]
                ));
            })
            .finally(_ => {

                setEditUserLocationLoading(false);
                endEditUserLocation();
            });

    }, [selectedUser, endEditUserLocation]);

    const deleteUser = useCallback(id => {

        setDeleteUserLoading(true);

        server
            .delete(`users/${id}`, {
                data: {
                    guid: uuidv4()
                }
            })
            .then(response => {

                let { result } = response.data;

                if (result === true) {

                    setDeleteUserResult(result);
                    clearUserSelection();

                    setUsersRefreshId(uuidv4());
                }
            })
            .catch(error => {

                setDeleteUserError(new Error(
                    error.response?.data?.message ||
                    [error.message]
                ));
            })
            .finally(_ => {

                setDeleteUserLoading(false);
            });

    }, [clearUserSelection]);

    const bindUserSearchField = useCallback(user => {

        user.searchField = [

            user.name,
            user.username,
            user.email
        ]
            .filter(Boolean).join(' ');

        return user;

    }, []);

    const unbindUserSearchField = useCallback(user => {

        delete user.searchField;

        return user;

    }, []);

    const resetCRUDStates = useCallback(_ => {

        setAddUserResult(false);
        setAddUserError(null);

        setEditUserResult(false);
        setEditUserError(null);

        setEditUserLocationResult(false);
        setEditUserLocationError(null);

        setDeleteUserResult(false);
        setDeleteUserError(null);

    }, []);

    useEffect(_ => {

        if (!mapView?.ready) return;

        let layer = new FeatureLayer({
            id: USERS_LAYER_ID,
            objectIdField: 'oid',
            legendEnabled: true,
            geometryType: 'point',
            spatialReference: mapView.spatialReference,
            outFields: ['*'],
            source: [],
            fields: [{
                name: 'oid',
                alias: 'oid',
                type: 'oid'
            }, {
                name: 'id',
                alias: 'id',
                type: 'string'
            }, {
                name: 'label',
                alias: 'label',
                type: 'string'
            }],
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-marker',
                    color: USER_MAP_ITEM_COLOR,
                    path: USER_MAP_ITEM_SVG_PATH,
                    size: USER_MAP_ITEM_SIZE,
                    outline: null
                }
            },
            labelsVisible: true,
            labelingInfo: {
                symbol: {
                    type: 'text',
                    color: common.white,
                    haloColor: blueGrey[900],
                    haloSize: 1.5,
                    font: {
                        family: 'sans-serif-regular',
                        size: 12,
                        weight: 'bold'
                    }
                },
                labelPlacement: 'above-center',
                labelExpressionInfo: {
                    expression: '$feature.label'
                }
            },
            featureEffect: DEFAULT_LAYER_EFFECT
        });

        let selectedUserLocationGraphicLayer = new GraphicsLayer({ id: SELECTED_USER_LOCATION_LAYER_ID, listMode: 'hide' });

        mapView.map.addMany([layer, selectedUserLocationGraphicLayer], Number.MAX_VALUE);

        return _ => {

            layer.destroy();
            selectedUserLocationGraphicLayer.destroy();
        }

    }, [mapView, t]);

    useEffect(_ => {

        if (!mapView?.ready) return;

        let layer = mapView.map.findLayerById(USERS_LAYER_ID);
        layer?.when(_ => layer.visible = viewVisible);

    }, [mapView, viewVisible]);

    useEffect(_ => {

        if (!mapView?.ready) return;

        let mapViewClickHandle = mapView.on('click', e => {

            e.button === 0 && mapView.container.style.cursor !== 'crosshair' &&

                mapView.hitTest(e).then(response => {

                    let hitTestResults = response.results.filter((result, i) => i === 0 && result.graphic?.layer?.id === USERS_LAYER_ID);

                    hitTestResults.length > 0 ?

                        selectUser(hitTestResults[0].graphic.attributes.id)
                        :
                        clearUserSelection();
                });
        });

        return _ => mapViewClickHandle.remove();

    }, [mapView, selectUser, clearUserSelection]);

    useEffect(_ => {

        if (manageUserStarted && manageUserDialogMode === 0) {

            let mapViewClickHandle = mapView?.on('click', e => {

                let { latitude, longitude } = e.mapPoint;

                setAddUserLocation({ latitude, longitude });
                setManageUserDialogVisible(true);
            });

            return _ => mapViewClickHandle?.remove();
        }

    }, [mapView, manageUserStarted, manageUserDialogMode]);

    useEffect(_ => {

        // Handle map click to edit existing user location

        if (editUserLocationStarted) {

            let mapViewClickHandle = mapView?.on('click', e => {

                let { latitude, longitude } = e.mapPoint;

                editSelectedUserLocation({ latitude, longitude })
            });

            return _ => mapViewClickHandle?.remove();
        }

    }, [mapView, editUserLocationStarted, editSelectedUserLocation]);

    useEffect(_ => {

        // Sync selected user location on map when adding a new user

        let selectedUserLocationGraphicLayer = mapView?.map.findLayerById(SELECTED_USER_LOCATION_LAYER_ID);

        selectedUserLocationGraphicLayer?.removeAll();

        addUserLocation && selectedUserLocationGraphicLayer?.add(new Graphic({
            geometry: { type: 'point', x: addUserLocation.longitude, y: addUserLocation.latitude },
            attributes: { id: uuidv4() },
            symbol: {
                type: 'simple-marker',
                color: 'rgba(189, 189, 189, 0.7)',
                path: USER_MAP_ITEM_SVG_PATH,
                size: USER_MAP_ITEM_SIZE,
                outline: null
            }
        }));

    }, [mapView, addUserLocation]);

    useEffect(_ => {

        const controller = new AbortController();

        const searchUsers = _ => {

            server
                .get(`users?guid=${uuidv4()}`, {
                    signal: controller.signal
                })
                .then(response => {

                    setUsersLoading(false);

                    let { result } = response.data;

                    let users = result
                        .map(user => bindUserSearchField(user))
                        .filter(user => usersSearchTextDebounced.toLowerCase().trim()
                            .split(' ')
                            .every(searchToken => user.searchField.toLowerCase().includes(searchToken)))
                        .map(user => unbindUserSearchField(user));

                    setUsers(users);
                })
                .catch(error => {

                    if (!axios.isCancel(error)) {

                        setUsers([]);
                        setUsersLoading(false);

                        setUsersError(new Error(
                            error.response?.data?.message ||
                            [error.message]
                        ));
                    }
                    else {

                        console.info(`Fetching users canceled`);
                    }
                });
        }

        setUsersLoading(true);
        searchUsers();

        return _ => {

            setUsersError(null);
            controller.abort();
        }

    }, [usersRefreshId, usersSearchTextDebounced, bindUserSearchField, unbindUserSearchField]);

    useEffect(_ => {

        if (!mapView?.ready) return;

        let layer = mapView.map.findLayerById(USERS_LAYER_ID);

        mapView.whenLayerView(layer)

            .then(_ => {

                let usersGraphics = users.map(user => {

                    let { id, name, address: { geo: { lng, lat } } } = user;

                    return new Graphic({
                        geometry: { type: 'point', x: lng, y: lat },
                        attributes: { id, label: name }
                    });
                });

                layer.queryFeatures()

                    .then(e => {

                        layer.applyEdits({

                            addFeatures: usersGraphics,
                            deleteFeatures: e.features

                        }).then(_ => {

                            setUsersLayerRefreshId(uuidv4());

                        }).catch(e => {

                            console.info(e.message);
                        });

                    }).catch(e => {

                        console.info(e.message);
                    });
            })
            .catch(e => {

                console.info(e.message);
            });

    }, [mapView, users, t]);

    useEffect(_ => {

        if (!mapView?.ready || !viewVisible) return;

        if (!selectedUser) {

            clearUserSelectionOnMap();
            return;
        }

        let watchMapViewAnimationHandle = selectedUser &&

            reactiveUtils.when(_ => !mapView.animation, _ => {

                let layer = mapView.map.findLayerById(USERS_LAYER_ID);

                layer?.when(_ => {

                    let query = layer.createQuery();
                    query.where = `id='${selectedUser.id}'`;
                    query.returnGeometry = true;

                    layer.queryFeatures(query).then(e => {

                        if (e.features.length === 0) return;

                        selectUserOnMap({ layerId: USERS_LAYER_ID, featureId: selectedUser.id });

                        watchMapViewAnimationHandle.remove();

                        mapView.goTo({
                            target: e.features[0].geometry,
                            scale: zoomToSelectedUser ? 73957190 : mapView.scale
                        }, {
                            duration: 600,
                            easing: 'ease-in-out'
                        })
                            .then(_ => setZoomToSelectedUser(false));
                    });
                });

            }, { initial: true });

        return _ => watchMapViewAnimationHandle?.remove?.();

    }, [mapView, viewVisible, usersLayerRefreshId, selectedUser, zoomToSelectedUser, selectUserOnMap, clearUserSelectionOnMap]);

    useEffect(_ => {

        // End adding an user if user switched to other screens

        if (selectedUser || !viewVisible)
            manageUserStarted && manageUserDialogMode === 0 && !manageUserDialogVisible && endAddUser();

    }, [viewVisible, selectedUser, manageUserStarted, manageUserDialogMode, manageUserDialogVisible, endAddUser]);

    return {
        viewVisible,
        users,
        usersLoading,
        usersError,
        usersSearchText,
        usersSearchTextDebounced,
        selectedUserId,
        selectedUser,
        manageUserDialogVisible,
        manageUserDialogMode,
        manageUserStarted,
        addUserLocation,
        addUserResult,
        addUserLoading,
        addUserError,
        editUserResult,
        editUserLoading,
        editUserError,
        editUserLocationStarted,
        editUserLocationResult,
        editUserLocationLoading,
        editUserLocationError,
        deleteUserResult,
        deleteUserLoading,
        deleteUserError,
        manageUserValidationResults,
        updateUsersSearchText,
        highlightUserOnMap,
        clearUserHighlightOnMap,
        selectUser,
        clearUserSelection,
        zoomToSelectedUserOnMap,
        startAddUser,
        endAddUser,
        addUser,
        startEditUser,
        endEditUser,
        editUser,
        startEditUserLocation,
        endEditUserLocation,
        setUserLocation,
        editSelectedUserLocation,
        deleteUser,
        resetCRUDStates
    }
}

export default useUsersViewModel;
