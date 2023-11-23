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

export const joinAllNotesExpressions = (notes) => {
    // join all notes expressions into one array
    let allNotesExpressions = [];

    notes.forEach((note) => {
        allNotesExpressions = allNotesExpressions.concat(note.expressions);
    });

    return allNotesExpressions;
};

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

export const getEmotionValues = (emotion, expressions) => {
    // join all notes expressions of one emotion into one array
    const emotionValues = expressions.map((expression) => expression[emotion]);
    return emotionValues;
};


export const normalizeEmotionsData = (emotionsData) => {
    let getRidOfNeutral = Object.keys(emocionesConNeutral)
        .filter(emocion => emocion !== 'neutral')
        .map(emocion => emocionesConNeutral[emocion]);

    let probSum = getRidOfNeutral.reduce((sum, prob) => sum + prob, 0);
    let normalizedData = getRidOfNeutral.map(prob => prob / probSum);

    return normalizedData;
}