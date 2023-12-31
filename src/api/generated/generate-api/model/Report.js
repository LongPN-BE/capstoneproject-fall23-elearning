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
import Student from './Student';
import Teacher from './Teacher';

/**
 * The Report model module.
 * @module model/Report
 * @version v1
 */
class Report {
    /**
     * Constructs a new <code>Report</code>.
     * @alias module:model/Report
     */
    constructor() { 
        
        Report.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Report</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Report} obj Optional instance to populate.
     * @return {module:model/Report} The populated <code>Report</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Report();

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
                obj['teacher'] = Teacher.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('student')) {
                obj['student'] = Student.constructFromObject(data['student']);
            }
            if (data.hasOwnProperty('reportType')) {
                obj['reportType'] = ApiClient.convertToType(data['reportType'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Report</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Report</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['content'] && !(typeof data['content'] === 'string' || data['content'] instanceof String)) {
            throw new Error("Expected the field `content` to be a primitive type in the JSON string but got " + data['content']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          Teacher.validateJSON(data['teacher']);
        }
        // validate the optional field `student`
        if (data['student']) { // data not null
          Student.validateJSON(data['student']);
        }
        // ensure the json data is a string
        if (data['reportType'] && !(typeof data['reportType'] === 'string' || data['reportType'] instanceof String)) {
            throw new Error("Expected the field `reportType` to be a primitive type in the JSON string but got " + data['reportType']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
Report.prototype['id'] = undefined;

/**
 * @member {String} content
 */
Report.prototype['content'] = undefined;

/**
 * @member {Date} createTime
 */
Report.prototype['createTime'] = undefined;

/**
 * @member {Boolean} status
 */
Report.prototype['status'] = undefined;

/**
 * @member {module:model/Teacher} teacher
 */
Report.prototype['teacher'] = undefined;

/**
 * @member {module:model/Student} student
 */
Report.prototype['student'] = undefined;

/**
 * @member {module:model/Report.ReportTypeEnum} reportType
 */
Report.prototype['reportType'] = undefined;





/**
 * Allowed values for the <code>reportType</code> property.
 * @enum {String}
 * @readonly
 */
Report['ReportTypeEnum'] = {

    /**
     * value: "STUDENT"
     * @const
     */
    "STUDENT": "STUDENT",

    /**
     * value: "TEACHER"
     * @const
     */
    "TEACHER": "TEACHER"
};



export default Report;

