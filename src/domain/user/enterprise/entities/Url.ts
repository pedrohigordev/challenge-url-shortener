import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UrlProps {
  originalUrl: string
  hash: string
  userId?: string
}

export class Url extends Entity<UrlProps> {
  get original_url() {
    return this.props.originalUrl
  }

  get hash() {
    return this.props.hash
  }

  get userId() {
    return this.props.userId
  }

  static create(props: UrlProps, id?: UniqueEntityID) {
    const url = new Url(props, id)

    return url
  }
}
