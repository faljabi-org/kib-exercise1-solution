import 'wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import 'lib/i18n';
import 'index.css';

import AppError from 'components/app/AppError';
import AppContainer from 'components/app/AppContainer';

import AppThemeProvider from 'providers/AppThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename={window.env.host.virtualPath}>
        <AppThemeProvider>
            <ErrorBoundary FallbackComponent={AppError}>
                <AppContainer />
            </ErrorBoundary>
        </AppThemeProvider>
    </BrowserRouter>
)