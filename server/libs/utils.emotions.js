/**
 * Calculates the expression status based on the given expression object.
 * @param {object} expression - The expression object containing emotion values.
 * @returns {number} - The status value indicating the expression status.
 */
export const getExpressionsStatus = (expression) => {
    let status = {
        positive: 1,
        negative: -1,
        neutral: 0,
    };

    // positive emotions
    let positive = expression.happy + expression.surprised;

    // negative emotions
    let negative =
        expression.angry +
        expression.disgusted +
        expression.fearful +
        expression.sad;

    // status comparison
    if (positive > negative) {
        return status.positive;
    } else if (negative > positive) {
        return status.negative;
    } else {
        return status.neutral;
    }
};

/**
 * Returns the expression with the highest percentage.
 *
 * @param {Object} expressions - An object containing expressions and their corresponding percentages.
 * @returns {string} - The expression with the highest percentage.
 */
export const getMaxExpression = (expressions) => {
    // get the expression with the highest percentage
    let maxExpression = "";
    let maxPercentage = 0;

    for (let key in expressions) {
        if (expressions[key] > maxPercentage) {
            maxPercentage = expressions[key];
            maxExpression = key;
        }
    }

    return maxExpression;
};

/**
 * Calculates the percentage of each expression in the given data.
 * @param {Object} data - The data containing expressions.
 * @returns {Object} - An object containing the percentage of each expression.
 */
export const getExpressionPercentage = (data) => {
    // get the expressions and global percentage of each expression
    const expressions = data.expressions;
    const total = expressions.length;
    const expressionPercentages = {};

    expressions.forEach((expression) => {
        for (let key in expression) {
            if (expressionPercentages[key]) {
                expressionPercentages[key] += expression[key];
            } else {
                expressionPercentages[key] = expression[key];
            }
        }
    });

    for (let key in expressionPercentages) {
        expressionPercentages[key] = expressionPercentages[key] / total;
    }

    return expressionPercentages;
};

/**
 * Joins all expressions from the given notes into a single array.
 *
 * @param {Array} notes - The array of notes.
 * @returns {Array} - The array containing all expressions from the notes.
 */
export const joinAllNotesExpressions = (notes) => {
    // join all notes expressions into one array
    let allNotesExpressions = [];

    notes.forEach((note) => {
        allNotesExpressions = allNotesExpressions.concat(note.expressions);
    });

    return allNotesExpressions;
};

/**
 * Calculates the emotion analysis of a note.
 * @param {Object} data - The data object containing the note expressions.
 * @returns {Object} - The analysis object containing the expressions list, expressions percentage, main expression, and status.
 */
export const getNoteEmotionAnalysis = (data) => {
    // get the emotion analysis of a note
    let analysis = {};

    const expressions_percentage = getExpressionPercentage(data);
    const main_expression = getMaxExpression(expressions);

    analysis = {
        expressions_list: data.expressions,
        expressions_percentage: expressions_percentage,
        main_expression: main_expression,
        status: getExpressionsStatus(expressions_percentage),
    };

    return analysis;
};

/**
 * Returns an array of emotion values for a given emotion.
 *
 * @param {string} emotion - The emotion to retrieve values for.
 * @param {Array} expressions - An array of expressions containing emotion values.
 * @returns {Array} - An array of emotion values.
 */
export const getEmotionValues = (emotion, expressions) => {
    // join all notes expressions of one emotion into one array
    const emotionValues = expressions.map((expression) => expression[emotion]);
    return emotionValues;
};


/**
 * Normalizes the emotions data by removing the 'neutral' emotion and calculating the normalized probabilities.
 * @param {Object} emotionsData - The emotions data object.
 * @returns {Array} - The normalized emotions data array.
 */
export const normalizeEmotionsData = (emotionsData) => {
    let getRidOfNeutral = Object.keys(emocionesConNeutral)
        .filter(emocion => emocion !== 'neutral')
        .map(emocion => emocionesConNeutral[emocion]);

    let probSum = getRidOfNeutral.reduce((sum, prob) => sum + prob, 0);
    let normalizedData = getRidOfNeutral.map(prob => prob / probSum);

    return normalizedData;
}