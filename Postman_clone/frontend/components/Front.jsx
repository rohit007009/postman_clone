import { useState } from 'react';
import './Front.css';

export const Front = () => {
  const [responseData, setResponseData] = useState(null);
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [contentType, setContentType] = useState('application/json');
  const [accept, setAccept] = useState('*/*');
  const [activeTab, setActiveTab] = useState('params');

  // Params State
  const [paramKey, setParamKey] = useState('');
  const [paramValue, setParamValue] = useState('');

  const handleSend = async () => {
    setResponseData({ loading: "Fetching data..." });
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': contentType,
          'Accept': accept
        }
      };

      if ((method === 'POST' || method === 'PUT') && requestBody) {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody));
        } catch (e) {
          setResponseData({ error: "Invalid JSON in Request Body" });
          return;
        }
      }

      const response = await fetch(url, options);
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      setResponseData({ error: "Failed to fetch. Check console or URL CORS policy." });
    }
  };

  const addParamToUrl = () => {
    if (!paramKey || !paramValue) return;
    const separator = url.includes('?') ? '&' : '?';
    setUrl(`${url}${separator}${paramKey}=${paramValue}`);
    setParamKey('');
    setParamValue('');
  };

  return (
    <div className="app-wrapper">
      <div className='header'><span>POST</span>MAN CLONE</div>

      <div className='main-container'>
        {/* Request Bar */}
        <div className='request-bar'>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="method-select">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            className="url-input"
            type='text'
            placeholder='https://api.example.com/data'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={handleSend} className='send-button'>SEND</button>
        </div>

        {/* Configuration Tabs */}
        <div className="config-section">
          <div className="tabs">
            <button className={activeTab === 'params' ? 'active' : ''} onClick={() => setActiveTab('params')}>Params</button>
            <button className={activeTab === 'headers' ? 'active' : ''} onClick={() => setActiveTab('headers')}>Headers</button>
            {(method === 'POST' || method === 'PUT') && (
              <button className={activeTab === 'body' ? 'active' : ''} onClick={() => setActiveTab('body')}>Body</button>
            )}
          </div>

          <div className="tab-content">
            {activeTab === 'params' && (
              <div className="param-row">
                <input placeholder='Key' value={paramKey} onChange={(e) => setParamKey(e.target.value)} />
                <input placeholder='Value' value={paramValue} onChange={(e) => setParamValue(e.target.value)} />
                <button onClick={addParamToUrl}>Add to URL</button>
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="header-row">
                <div className="input-group">
                  <label>Content-Type</label>
                  <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                    <option value="application/json">application/json</option>
                    <option value="text/plain">text/plain</option>
                    <option value="application/xml">application/xml</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Accept</label>
                  <select value={accept} onChange={(e) => setAccept(e.target.value)}>
                    <option value="*/*">*/*</option>
                    <option value="application/json">application/json</option>
                    <option value="text/html">text/html</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'body' && (
              <textarea
                className="body-editor"
                placeholder='{"key": "value"}'
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows="6"
              />
            )}
          </div>
        </div>

        {/* Response Section */}
        <div className='response-section'>
          <div className="response-header">
            <h3>Response</h3>
          </div>
          <div className='response-display'>
            <pre>
              {responseData ? JSON.stringify(responseData, null, 2) : "// Click Send to see response"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};