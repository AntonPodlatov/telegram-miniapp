import { reactive } from 'vue';
import NameStep from './steps/NameStep.vue';
import BirthdayStep from './steps/BirthdayStep.vue';
import GenderStep from './steps/GenderStep.vue';
import PurposeStep from './steps/PurposeStep.vue';
import PhotoStep from './steps/PhotoStep.vue';

export const form = reactive<User>({
    name: '',
    birthday: '', // YYYY-MM-DD
    age: 0,
    gender: '',
    showGender: '', // кого показывать
    purpose: '',
    photo: '' // base64
});

export interface OnboardingStep {
    id: string
    title: string
    component: any
    validate: () => boolean
}

export const onboardingSteps: OnboardingStep[] = [
    {
        id: 'name',
        title: 'Как тебя зовут?',
        component: NameStep,
        validate: () => form.name.length >= 2
    },
    {
        id: 'birthday',
        title: 'Дата рождения',
        component: BirthdayStep,
        validate: () => form.age >= 18
    },
    {
        id: 'gender',
        title: 'Пол и кого показывать',
        component: GenderStep,
        validate: () => form.gender !== '' && form.showGender !== ''
    },
    {
        id: 'purpose',
        title: 'Для чего вы здесь?',
        component: PurposeStep,
        validate: () => form.purpose !== ''
    },
    {
        id: 'photo',
        title: 'Добавьте фото',
        component: PhotoStep,
        validate: () => form.photo !== ''
    }
]
