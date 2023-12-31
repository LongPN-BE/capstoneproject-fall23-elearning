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
 * The ResponseDTOString model module.
 * @module model/ResponseDTOString
 * @version v1
 */
class ResponseDTOString {
    /**
     * Constructs a new <code>ResponseDTOString</code>.
     * @alias module:model/ResponseDTOString
     */
    constructor() { 
        
        ResponseDTOString.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResponseDTOString</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResponseDTOString} obj Optional instance to populate.
     * @return {module:model/ResponseDTOString} The populated <code>ResponseDTOString</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResponseDTOString();

            if (data.hasOwnProperty('code')) {
                obj['code'] = ApiClient.convertToType(data['code'], 'Number');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('responseObject')) {
                obj['responseObject'] = ApiClient.convertToType(data['responseObject'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResponseDTOString</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResponseDTOString</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }
        // ensure the json data is a string
        if (data['responseObject'] && !(typeof data['responseObject'] === 'string' || data['responseObject'] instanceof String)) {
            throw new Error("Expected the field `responseObject` to be a primitive type in the JSON string but got " + data['responseObject']);
        }

        return true;
    }


}



/**
 * @member {Number} code
 */
ResponseDTOString.prototype['code'] = undefined;

/**
 * @member {String} message
 */
ResponseDTOString.prototype['message'] = undefined;

/**
 * @member {String} responseObject
 */
ResponseDTOString.prototype['responseObject'] = undefined;






export default ResponseDTOString;

