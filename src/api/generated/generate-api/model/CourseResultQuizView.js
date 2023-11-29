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
import SubjectResultQuizView from './SubjectResultQuizView';
import TeacherResultQuizView from './TeacherResultQuizView';

/**
 * The CourseResultQuizView model module.
 * @module model/CourseResultQuizView
 * @version v1
 */
class CourseResultQuizView {
    /**
     * Constructs a new <code>CourseResultQuizView</code>.
     * @alias module:model/CourseResultQuizView
     */
    constructor() { 
        
        CourseResultQuizView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CourseResultQuizView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CourseResultQuizView} obj Optional instance to populate.
     * @return {module:model/CourseResultQuizView} The populated <code>CourseResultQuizView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CourseResultQuizView();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('limitTime')) {
                obj['limitTime'] = ApiClient.convertToType(data['limitTime'], 'Number');
            }
            if (data.hasOwnProperty('averagePoint')) {
                obj['averagePoint'] = ApiClient.convertToType(data['averagePoint'], 'Number');
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherResultQuizView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = SubjectResultQuizView.constructFromObject(data['subject']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CourseResultQuizView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CourseResultQuizView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['image'] && !(typeof data['image'] === 'string' || data['image'] instanceof String)) {
            throw new Error("Expected the field `image` to be a primitive type in the JSON string but got " + data['image']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherResultQuizView.validateJSON(data['teacher']);
        }
        // validate the optional field `subject`
        if (data['subject']) { // data not null
          SubjectResultQuizView.validateJSON(data['subject']);
        }

        return true;
    }


}



/**
 * @member {String} name
 */
CourseResultQuizView.prototype['name'] = undefined;

/**
 * @member {module:model/CourseResultQuizView.StatusEnum} status
 */
CourseResultQuizView.prototype['status'] = undefined;

/**
 * @member {String} image
 */
CourseResultQuizView.prototype['image'] = undefined;

/**
 * @member {String} description
 */
CourseResultQuizView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
CourseResultQuizView.prototype['createDate'] = undefined;

/**
 * @member {Number} price
 */
CourseResultQuizView.prototype['price'] = undefined;

/**
 * @member {Number} limitTime
 */
CourseResultQuizView.prototype['limitTime'] = undefined;

/**
 * @member {Number} averagePoint
 */
CourseResultQuizView.prototype['averagePoint'] = undefined;

/**
 * @member {module:model/TeacherResultQuizView} teacher
 */
CourseResultQuizView.prototype['teacher'] = undefined;

/**
 * @member {module:model/SubjectResultQuizView} subject
 */
CourseResultQuizView.prototype['subject'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
CourseResultQuizView['StatusEnum'] = {

    /**
     * value: "ACTIVE"
     * @const
     */
    "ACTIVE": "ACTIVE",

    /**
     * value: "DEACTIVE"
     * @const
     */
    "DEACTIVE": "DEACTIVE",

    /**
     * value: "PENDING"
     * @const
     */
    "PENDING": "PENDING",

    /**
     * value: "DRAFT"
     * @const
     */
    "DRAFT": "DRAFT",

    /**
     * value: "REJECT"
     * @const
     */
    "REJECT": "REJECT"
};



export default CourseResultQuizView;

