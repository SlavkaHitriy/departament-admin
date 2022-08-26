import { makeAutoObservable } from 'mobx'

class Teachers {
    teachers = []

    constructor() {
        makeAutoObservable(this)
    }

    setTeachers(teachers) {
        this.teachers = teachers
    }

    deleteTeacher(id) {
        this.teachers = this.teachers.filter(teacher => teacher.id !== id)
    }
}

export const TeachersStore = new Teachers()
