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
 * The SystemConfig model module.
 * @module model/SystemConfig
 * @version v1
 */
class SystemConfig {
    /**
     * Constructs a new <code>SystemConfig</code>.
     * @alias module:model/SystemConfig
     */
    constructor() { 
        
        SystemConfig.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SystemConfig</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SystemConfig} obj Optional instance to populate.
     * @return {module:model/SystemConfig} The populated <code>SystemConfig</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SystemConfig();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('version')) {
                obj['version'] = ApiClient.convertToType(data['version'], 'String');
            }
            if (data.hasOwnProperty('projectName')) {
                obj['projectName'] = ApiClient.convertToType(data['projectName'], 'String');
            }
            if (data.hasOwnProperty('dateCreate')) {
                obj['dateCreate'] = ApiClient.convertToType(data['dateCreate'], 'String');
            }
            if (data.hasOwnProperty('studyingTime')) {
                obj['studyingTime'] = ApiClient.convertToType(data['studyingTime'], 'Number');
            }
            if (data.hasOwnProperty('retryTestTime')) {
                obj['retryTestTime'] = ApiClient.convertToType(data['retryTestTime'], 'Number');
            }
            if (data.hasOwnProperty('defaultImage')) {
                obj['defaultImage'] = ApiClient.convertToType(data['defaultImage'], 'String');
            }
            if (data.hasOwnProperty('defaultQuizTime')) {
                obj['defaultQuizTime'] = ApiClient.convertToType(data['defaultQuizTime'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SystemConfig</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SystemConfig</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['version'] && !(typeof data['version'] === 'string' || data['version'] instanceof String)) {
            throw new Error("Expected the field `version` to be a primitive type in the JSON string but got " + data['version']);
        }
        // ensure the json data is a string
        if (data['projectName'] && !(typeof data['projectName'] === 'string' || data['projectName'] instanceof String)) {
            throw new Error("Expected the field `projectName` to be a primitive type in the JSON string but got " + data['projectName']);
        }
        // ensure the json data is a string
        if (data['dateCreate'] && !(typeof data['dateCreate'] === 'string' || data['dateCreate'] instanceof String)) {
            throw new Error("Expected the field `dateCreate` to be a primitive type in the JSON string but got " + data['dateCreate']);
        }
        // ensure the json data is a string
        if (data['defaultImage'] && !(typeof data['defaultImage'] === 'string' || data['defaultImage'] instanceof String)) {
            throw new Error("Expected the field `defaultImage` to be a primitive type in the JSON string but got " + data['defaultImage']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
SystemConfig.prototype['id'] = undefined;

/**
 * @member {String} version
 */
SystemConfig.prototype['version'] = undefined;

/**
 * @member {String} projectName
 */
SystemConfig.prototype['projectName'] = undefined;

/**
 * @member {String} dateCreate
 */
SystemConfig.prototype['dateCreate'] = undefined;

/**
 * @member {Number} studyingTime
 */
SystemConfig.prototype['studyingTime'] = undefined;

/**
 * @member {Number} retryTestTime
 */
SystemConfig.prototype['retryTestTime'] = undefined;

/**
 * @member {String} defaultImage
 */
SystemConfig.prototype['defaultImage'] = undefined;

/**
 * @member {Number} defaultQuizTime
 */
SystemConfig.prototype['defaultQuizTime'] = undefined;






export default SystemConfig;

