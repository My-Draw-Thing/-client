import db from '@/configs/firebase'

const quizilla = db.collection('quizilla')
const questions = db.collection('questions')

export default { quizilla, questions}
