/*!
 * Copyright 2019 Omar Tawfik. Please see LICENSE file at the root of this repository.
 */

import { DocumentSyntax, BlockSyntax, BaseSyntaxNode, VersionSyntax, PropertySyntax } from "../parsing/syntax-nodes";

export const enum BoundKind {
  // Top level
  Document = 1,
  Version = 2,
  Workflow = 3,
  Action = 4,

  // Properties
  On = 5,
  Resolves = 6,
  Uses = 7,
  Needs = 8,
  Runs = 9,
  Args = 10,
  Env = 11,
  Secrets = 12,
}

export abstract class BaseBoundNode<TSyntax extends BaseSyntaxNode> {
  protected constructor(public readonly kind: BoundKind, public readonly syntax: TSyntax) {}
}

export class BoundDocument extends BaseBoundNode<DocumentSyntax> {
  public constructor(
    public readonly version: BoundVersion | undefined,
    public readonly workflows: ReadonlyArray<BoundWorkflow>,
    public readonly actions: ReadonlyArray<BoundAction>,
    syntax: DocumentSyntax,
  ) {
    super(BoundKind.Document, syntax);
  }
}

export class BoundVersion extends BaseBoundNode<VersionSyntax> {
  public constructor(public readonly version: number, syntax: VersionSyntax) {
    super(BoundKind.Version, syntax);
  }
}

export class BoundWorkflow extends BaseBoundNode<BlockSyntax> {
  public constructor(
    public readonly name: string,
    public readonly on: BoundOn | undefined,
    public readonly resolves: BoundResolves | undefined,
    syntax: BlockSyntax,
  ) {
    super(BoundKind.Workflow, syntax);
  }
}

export class BoundAction extends BaseBoundNode<BlockSyntax> {
  public constructor(
    public readonly name: string,
    public readonly uses: BoundUses | undefined,
    public readonly needs: BoundNeeds | undefined,
    public readonly runs: BoundRuns | undefined,
    public readonly args: BoundArgs | undefined,
    public readonly env: BoundEnv | undefined,
    public readonly secrets: BoundSecrets | undefined,
    syntax: BlockSyntax,
  ) {
    super(BoundKind.Action, syntax);
  }
}

export class BoundOn extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly event: string, syntax: PropertySyntax) {
    super(BoundKind.On, syntax);
  }
}

export class BoundResolves extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly actions: ReadonlyArray<string>, syntax: PropertySyntax) {
    super(BoundKind.Resolves, syntax);
  }
}

export class BoundUses extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly value: string, syntax: PropertySyntax) {
    super(BoundKind.Uses, syntax);
  }
}

export class BoundNeeds extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly actions: ReadonlyArray<string>, syntax: PropertySyntax) {
    super(BoundKind.Needs, syntax);
  }
}

export class BoundRuns extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly commands: ReadonlyArray<string>, syntax: PropertySyntax) {
    super(BoundKind.Runs, syntax);
  }
}

export class BoundArgs extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly args: ReadonlyArray<string>, syntax: PropertySyntax) {
    super(BoundKind.Args, syntax);
  }
}

export class BoundEnv extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly variables: ReadonlyMap<string, string>, syntax: PropertySyntax) {
    super(BoundKind.Env, syntax);
  }
}

export class BoundSecrets extends BaseBoundNode<PropertySyntax> {
  public constructor(public readonly args: ReadonlyArray<string>, syntax: PropertySyntax) {
    super(BoundKind.Secrets, syntax);
  }
}