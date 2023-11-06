/**
 * FPT SE OnLearn management API
 * FPT OnLearn Management API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The AuthenticationResponse model module.
 * @module model/AuthenticationResponse
 * @version v1
 */
class AuthenticationResponse {
    /**
     * Constructs a new <code>AuthenticationResponse</code>.
     * @alias module:model/AuthenticationResponse
     */
    constructor() { 
        
        AuthenticationResponse.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AuthenticationResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthenticationResponse} obj Optional instance to populate.
     * @return {module:model/AuthenticationResponse} The populated <code>AuthenticationResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthenticationResponse();

            if (data.hasOwnProperty('token')) {
                obj['token'] = ApiClient.convertToType(data['token'], 'String');
            }
            if (data.hasOwnProperty('refreshToken')) {
                obj['refreshToken'] = ApiClient.convertToType(data['refreshToken'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuthenticationResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthenticationResponse</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['token'] && !(typeof data['token'] === 'string' || data['token'] instanceof String)) {
            throw new Error("Expected the field `token` to be a primitive type in the JSON string but got " + data['token']);
        }
        // ensure the json data is a string
        if (data['refreshToken'] && !(typeof data['refreshToken'] === 'string' || data['refreshToken'] instanceof String)) {
            throw new Error("Expected the field `refreshToken` to be a primitive type in the JSON string but got " + data['refreshToken']);
        }

        return true;
    }


}



/**
 * @member {String} token
 */
AuthenticationResponse.prototype['token'] = undefined;

/**
 * @member {String} refreshToken
 */
AuthenticationResponse.prototype['refreshToken'] = undefined;






export default AuthenticationResponse;

