'use client';

import { useState } from 'react';
import { devFeatures, getEnvironmentInfo, logger } from '@/lib/env';

export function DevToolbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Only show in development environment
  if (!devFeatures.showDebugInfo) {
    return null;
  }

  const envInfo = getEnvironmentInfo();

  const handleClearCache = () => {
    if (typeof window !== 'undefined') {
      // Clear localStorage
      localStorage.clear();

      // Clear sessionStorage
      sessionStorage.clear();

      // Clear SWR cache if available
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }

      logger.info('Cache cleared');
      alert('Cache cleared! Refresh the page to see changes.');
    }
  };

  const handleTestAPI = async () => {
    try {
      logger.info('Testing API connection...');
      const response = await fetch(`${envInfo.apiUrl}/health`);
      const data = await response.json();

      if (response.ok) {
        logger.info('API Test successful:', data);
        alert(
          `API Test successful!\nStatus: ${data.status}\nTimestamp: ${data.timestamp}`
        );
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      logger.error('API Test failed:', error);
      alert(
        `API Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const handleCopyEnvInfo = () => {
    const envText = JSON.stringify(envInfo, null, 2);
    navigator.clipboard.writeText(envText).then(() => {
      logger.info('Environment info copied to clipboard');
      alert('Environment info copied to clipboard!');
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 font-mono text-xs">
      {/* Main Toolbar */}
      <div className="rounded-lg border border-red-600 bg-red-500 text-white shadow-lg">
        {/* Header */}
        <div
          className="flex cursor-pointer items-center justify-between px-3 py-2 transition-colors hover:bg-red-600"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="text-yellow-300">🚧</span>
            <span className="font-semibold">DEV MODE</span>
          </div>
          <span className="text-red-200">{isExpanded ? '▼' : '▶'}</span>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-red-600">
            {/* Environment Info */}
            <div className="bg-red-600 px-3 py-2">
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="text-red-200">Env:</span>
                <span className="font-semibold text-white">
                  {envInfo.environment}
                </span>

                <span className="text-red-200">API:</span>
                <span className="truncate text-white" title={envInfo.apiUrl}>
                  {envInfo.apiUrl.replace('https://', '').split('/')[0]}
                </span>

                <span className="text-red-200">Debug:</span>
                <span className="text-white">
                  {envInfo.debugMode ? '✅' : '❌'}
                </span>

                <span className="text-red-200">Local:</span>
                <span className="text-white">
                  {envInfo.isLocal ? '✅' : '❌'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-1 px-3 py-2">
              <div className="flex gap-1">
                <button
                  onClick={handleTestAPI}
                  className="flex-1 rounded bg-green-600 px-2 py-1 text-xs text-white transition-colors hover:bg-green-700"
                  title="Test API connection"
                >
                  🏥 API Test
                </button>

                <button
                  onClick={handleClearCache}
                  className="flex-1 rounded bg-orange-600 px-2 py-1 text-xs text-white transition-colors hover:bg-orange-700"
                  title="Clear all caches"
                >
                  🗑️ Clear Cache
                </button>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex-1 rounded bg-blue-600 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-700"
                  title="Show detailed environment info"
                >
                  📊 {showDetails ? 'Hide' : 'Show'} Details
                </button>

                <button
                  onClick={handleCopyEnvInfo}
                  className="flex-1 rounded bg-purple-600 px-2 py-1 text-xs text-white transition-colors hover:bg-purple-700"
                  title="Copy environment info to clipboard"
                >
                  📋 Copy Info
                </button>
              </div>
            </div>

            {/* Detailed Info */}
            {showDetails && (
              <div className="max-h-64 overflow-y-auto border-t border-red-600 bg-gray-900 px-3 py-2 text-gray-300">
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(envInfo, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Environment Badge */}
      {!isExpanded && (
        <div className="mt-2 rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-black shadow-lg">
          {envInfo.environment.toUpperCase()}
        </div>
      )}
    </div>
  );
}
