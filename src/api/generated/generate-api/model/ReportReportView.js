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
import TeacherReportView from './TeacherReportView';

/**
 * The ReportReportView model module.
 * @module model/ReportReportView
 * @version v1
 */
class ReportReportView {
    /**
     * Constructs a new <code>ReportReportView</code>.
     * @alias module:model/ReportReportView
     */
    constructor() { 
        
        ReportReportView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ReportReportView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ReportReportView} obj Optional instance to populate.
     * @return {module:model/ReportReportView} The populated <code>ReportReportView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ReportReportView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
            if (data.hasOwnProperty('createTime')) {
                obj['createTime'] = ApiClient.convertToType(data['createTime'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Boolean');
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherReportView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('student')) {
                obj['student'] = ApiClient.convertToType(data['student'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ReportReportView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ReportReportView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherReportView.validateJSON(data['teacher']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
ReportReportView.prototype['id'] = undefined;

/**
 * @member {String} content
 */
ReportReportView.prototype['content'] = undefined;

/**
 * @member {Date} createTime
 */
ReportReportView.prototype['createTime'] = undefined;

/**
 * @member {Boolean} status
 */
ReportReportView.prototype['status'] = undefined;

/**
 * @member {module:model/TeacherReportView} teacher
 */
ReportReportView.prototype['teacher'] = undefined;

/**
 * @member {Object} student
 */
ReportReportView.prototype['student'] = undefined;






export default ReportReportView;

